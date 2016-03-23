require 'rails_helper'

feature 'Making a request for a tour' do

  before(:each) do
    signup
    request_tour
  end

  it '-> allows the user to make a tour request' do
    visit('/requests')
    expect(page).to have_content('Iron_Lion_Zion has requested a tour in: London')
    expect(page).to have_content('Iron_Lion_Zion has added the following specifications to his/her desired tour: great times wanted')
    p Time.now
  end

  it '-> a user\'s request will expire after 5 days' do
    five_days_from_now = Time.local(2016, 3, 30, 13, 0, 0)
    Timecop.travel(five_days_from_now)
    p Time.now
    visit('/requests')
    expect(page).to_not have_content('Iron_Lion_Zion has requested a tour in: London')
    expect(page).to_not have_content('Iron_Lion_Zion has added the following specifications to his/her desired tour: great times wanted')
  end



end
