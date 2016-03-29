require 'rails_helper'

feature 'Leaving reviews on tours', js:true do

  before do
    signup
    expect(page).to have_css('.gm-style')
    request_tour
    request_tour
    expect(page).to have_content('Request submitted')
    click_link 'Logout'
    signup("Jimmy", "Hendrix", 'hendrix_fan', 'SW1 8AP', 'b@aol.com', "password")
    expect(page).to have_css('.gm-style')
    request = Request.first
    visit("/requests/#{request.id}/replies/new")
    reply_to_request
  end

  it '-> lets the request-owner leave a review' do
    click_link 'Logout'
    signin
    visit('/requests')
    expect(page).to have_content 'Leave a review'
    click_link 'Leave a review'
    select 5, from: 'review_rating'
    fill_in :'review[description]', with: 'Great fun'
    click_button 'Submit review'
    expect(page).to have_content 'Review submitted'
  end


  it '-> calculates the average star rating of a tour guide which displays on user profile/reply' do
    click_link 'Logout'
    signin
    visit('/requests')
    click_link 'Leave a review'
    select 5, from: 'review_rating'
    fill_in :'review[description]', with: 'Great fun'
    click_button 'Submit review'
    visit('/requests')
    click_link 'Leave a review'
    select 1, from: 'review_rating'
    fill_in :'review[description]', with: 'Great fun'
    click_button 'Submit review'
    click_link 'Logout'
    signin
    visit('/profile')
    expect(page).to have_content('Average rating: ★★★☆☆')
    visit('/requests')
    expect(page).to have_content('hendrix_fan ★★★☆☆')
  end
end
