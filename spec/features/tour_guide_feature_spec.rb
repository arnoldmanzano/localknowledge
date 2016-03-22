require 'rails_helper'

feature 'Submitting an advertisement for a tour' do

  before do
    signup
  end

  xit '-> allows the tour guide to advertise a tour' do
    add_tour
    expect(page).to have_content('A fun history tour')
    expect(page).to have_content('Location: London')
    expect(page).to have_content('Cost: £20')
  end
end
