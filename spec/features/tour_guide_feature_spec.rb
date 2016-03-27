require 'rails_helper'
include Capybara::Angular::DSL

feature 'Replying to client requests', js:true do

  before do
    signup(f_name: "Bob", l_name: "Marley", username: 'Iron_Lion_Zion', postcode: 'W12 7JQ', email: 'bob@bob.com', password: "password")
    expect(page).to have_css('.gm-style')
    request_tour
    expect(page).to have_content('Request submitted')
    click_link 'Logout'
    signup(f_name: "Jimmy", l_name: "Hendrix", username: 'hendrix_fan', postcode: 'SW1 8AP', email: 'b@aol.com', password: "password")
    expect(page).to have_css('.gm-style')
    visit('/requests')
    reply_to_request
  end

  it '-> allows the tour guide to respond to a request' do
    expect(current_path).to eq('/requests')
    expect(page).to have_content('Duration: 2 hours Cost: £20 Description: A fun history tour')
  end

  it '-> tour guides can update their replies' do
    visit('/requests')
    click_link 'Update'
    fill_in :reply_meeting_point, with: 'Timbuktu'
    click_button 'Reply'
    expect(page).to have_content('Meeting point: Timbuktu')
  end

  it ('-> only a tour guide can update their own reply') do
    click_link "Logout"
    signup(f_name: "Jim", l_name: "Morrisson", username: 'rider_of_the_storm', postcode: 'SW8 7UP', email: 'bob@aol.com', password: "password")
    visit('/requests')
    expect(page).to_not have_content('Update')
  end

  it '-> tour guides can delete their reply' do
    visit('/requests')
    click_link 'Delete'
    expect(page).to_not have_content('good times wanted')
    expect(page).to have_content('Request deleted successfully')
  end

  it ('-> only a tour guide can delete their own reply') do
    click_link "Logout"
    signup(f_name: "Jimmy", l_name: "Hendrix", username: 'hendrix_fan', postcode: 'SW1 8AP', email: 'bobbybrown@aol.com', password: "password")
    expect(page).to_not have_content('Delete')
  end


end
