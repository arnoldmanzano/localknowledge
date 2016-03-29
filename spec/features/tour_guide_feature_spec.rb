require 'rails_helper'

feature 'Replying to client requests', js:true do

  it 'describes the whole user flow of replying to a tour' do
    visit('/')
    signup
    expect(page).to have_css('.gm-style')
    request_tour('E1 6LT, London')
    expect(page).to have_content('Request submitted')
    click_link 'Logout'

    signup("Jimmy", "Hendrix", 'hendrix_fan', 'SW1 8AP', 'b@aol.com', "password")
    expect(page).to have_css('.gm-style')
    # expect(page).to have_css("img[src*='spotlight-poi.png']")
    # find("img[src*='spotlight-poi.png']").click
    # click_button 'Reply to Bob Marley\'s request'

    request = Request.first
    visit("/requests/#{request.id}/replies/new")
    reply_to_request
    # visit my_responses page
    # expect(page).to have_content('Duration: 2 hours Cost: £20 Description: A fun history tour')
  end

  xit '-> tour guides can update their replies' do
    visit('/requests')
    click_link 'Update'
    fill_in :reply_meeting_point, with: 'Timbuktu'
    click_button 'Reply'
    expect(page).to have_content('Meeting point: Timbuktu')
  end

  xit ('-> only a tour guide can update their own reply') do
    click_link "Logout"
    signup("Jim", "Morrisson", 'rider_of_the_storm', 'SW8 7UP', 'bob@aol.com', "password")
    visit('/requests')
    expect(page).to_not have_content('Update')
  end

  xit '-> tour guides can delete their reply' do
    visit('/requests')
    click_link 'Delete'
    expect(page).to_not have_content('good times wanted')
    expect(page).to have_content('Request deleted successfully')
  end

  xit ('-> only a tour guide can delete their own reply') do
    click_link "Logout"
    signup("Jimmy", "Hendrix", 'hendrix_fan', 'SW1 8AP', 'bobbybrown@aol.com', "password")
    expect(page).to_not have_content('Delete')
  end
end
