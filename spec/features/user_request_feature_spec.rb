require 'rails_helper'
include Capybara::Angular::DSL

feature 'Making a request for a tour', js:true do

  before(:each) do
    signup
    expect(page).to have_css('.gm-style')
    request_tour
    expect(page).to have_content('Request submitted')
  end

  it '-> allows the user to make a tour request' do
    visit('/requests')
    expect(page).to have_content('Request for a tour in: London')
    expect(page).to have_content('Details: great times wanted')
  end

  it '-> a user\'s request will expire after 5 days' do
    Timecop.travel(5.days.from_now)
    visit('/requests')
    expect(page).to_not have_content('Requested for a tour in: London')
    expect(page).to_not have_content('Details: great times wanted')
  end

  it '-> a user\'s request won\'t expire if it\'s been replied to' do
    click_link 'Logout'
    signup(f_name: "Jimmy", l_name: "Hendrix", username: 'hendrix_fan', postcode: 'SW1 8AP', email: 'bobbybrown@aol.com', password: "password")
    visit('/requests')
    reply_to_request
    Timecop.travel(5.days.from_now)
    visit('/requests')
    expect(page).to have_content('Duration: 2 hours')
    expect(page).to have_content('Cost: £20')
    expect(page).to have_content('Meeting point: London')
  end

  it '-> users can update their requests' do
    visit('/requests')
    expect(page).to have_content('Request for a tour in: London')
    click_link 'Update'
    fill_in :'request[location]', with: 'Essex'
    fill_in :'request[description]', with: 'bad times wanted'
    click_button 'Submit'
    expect(page).to have_content('Request for a tour in: Essex')
    expect(page).to have_content('Details: bad times wanted')
    expect(page).to have_content('Request updated successfully')
  end

  it ('-> only a user can update their own request') do
    click_link "Logout"
    signup(f_name: "Jimmy", l_name: "Hendrix", username: 'hendrix_fan', postcode: 'SW1 8AP', email: 'bobbybrown@aol.com', password: "password")
    visit('/requests')
    expect(page).to have_content('Request for a tour in: London')
    expect(page).to_not have_content('Update')
  end

  it '-> users can delete their requests' do
    visit('/requests')
    click_link 'Delete'
    expect(page).to_not have_content('good times wanted')
    expect(page).to have_content('Request deleted successfully')
  end

  it ('-> only a user can delete their own request') do
    click_link "Logout"
    signup(f_name: "Jimmy", l_name: "Hendrix", username: 'hendrix_fan', postcode: 'SW1 8AP', email: 'bobbybrown@aol.com', password: "password")
    visit('/requests')
    expect(page).to_not have_content('Delete')
  end

end
