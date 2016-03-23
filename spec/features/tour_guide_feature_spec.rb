require 'rails_helper'

feature 'Replying to client requests' do

  before do
    signup
    request_tour
  end

  it '-> allows the tour guide to respond to a request' do
    click_link 'Logout'
    signup(f_name: "Jimmy", l_name: "Hendrix", username: 'hendrix_fan', postcode: 'SW1 8AP', email: 'bobbybrown@aol.com', password: "password")
    visit('/requests')
    click_link 'Reply'
    reply_to_request
    expect(current_path).to eq('/requests')
    expect(page).to have_content('Duration: 2 hours Cost: £20 Description: A fun history tour')
  end
end
