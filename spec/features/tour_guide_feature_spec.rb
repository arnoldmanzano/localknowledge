require 'rails_helper'

feature 'Replying to client requests' do

  before do
    signup
    Request.create(location: "London", description: "A fun history tour")
  end

  it '-> allows the tour guide to respond to a request' do
    visit '/requests'
    click_link 'Reply'
    reply_to_request
    expect(current_path).to eq('/requests')
    expect(page).to have_content('Duration: 2 hours Cost: £20 Description: A fun history tour')
  end
end
