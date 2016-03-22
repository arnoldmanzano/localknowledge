require 'rails_helper'

feature 'Making a request for a tour' do

  before do
    signup
  end

  it '-> allows the user to make a tour request' do
    request_tour
    visit('/requests')
    expect(page).to have_content('Iron_Lion_Zion has requested a tour in: London')
    expect(page).to have_content('Iron_Lion_Zion has added the following specifications to his/her desired tour: great times wanted')
  end

end
