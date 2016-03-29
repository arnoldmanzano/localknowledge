require 'rails_helper'

feature 'Leaving reviews on tours', js:true do

  before do
    signup
    expect(page).to have_css('.gm-style')
    request_tour
    expect(page).to have_content('Request submitted')
    click_link 'Logout'
    signup("Jimmy", "Hendrix", 'hendrix_fan', 'SW1 8AP', 'b@aol.com', "password")
    expect(page).to have_css('.gm-style')
    visit('/requests')
    reply_to_request
  end

  # it '-> only lets the request-owner review the tour' do
  #   click_link 'Logout'
  #   signup("Jim", "Jones", "jonesy", "SW1 8TR", "bbking@aol.com", "password")
  #   visit('/requests')
  #   expect(page).to_not have_content 'Leave review'
  # end

  it '-> lets the request-owner leave a review' do
    click_link 'Logout'
    signin
    visit('/requests')
    expect(page).to have_content 'Leave review'
    click_link 'Leave review'
    fill_in :'review[rating]', with: 5
    fill_in :'review[description]', with: 'Great fun'
    click_button 'Leave review'
    expect(page).to have_content '★★★★★'
    expect(page).to have_content 'Great fun'
  end


end
