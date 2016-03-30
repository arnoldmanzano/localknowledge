require 'rails_helper'

feature 'Leaving reviews on tours', js:true do

  it '-> lets the request-owner leave a review and the reviews are averaged' do
    signup
    expect(page).to have_css('.gm-style')
    request_tour
    # request_tour
    expect(page).to have_content('Request submitted')
    click_link 'Logout'
    signup("Jimmy", "Hendrix", 'hendrix_fan', 'SW1 8AP', 'b@aol.com', "password")
    expect(page).to have_css('.gm-style')

    request = Request.first
    visit("/requests/#{request.id}/replies/new")
    reply_to_request
    click_link 'Logout'

    signin
    visit('/requests')
    click_link 'Choose'
    expect(page).to have_content 'Leave a review'
    click_link 'Leave a review'
    select 5, from: 'review_rating'
    fill_in :'review[description]', with: 'Great fun'
    click_button 'Submit review'
    expect(page).to have_content 'Review submitted'
    expect(page).to have_content('★★★★★ (1)')

    click_link 'Leave a review'
    select 1, from: 'review_rating'
    fill_in :'review[description]', with: 'Great fun'
    click_button 'Submit review'
    expect(page).to have_content('★★★☆☆ (2)')
    click_link 'Logout'

    signin('b@aol.com')
    visit('/profile')
    expect(page).to have_content('★★★☆☆ (2)')
  end

end
