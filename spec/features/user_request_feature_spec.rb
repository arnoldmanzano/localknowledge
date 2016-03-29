require 'rails_helper'

feature 'Making a request for a tour', js:true do

# <<<<<<< HEAD
#   context '===> accessing the form ' do
#
#     context '===> when not logged in' do
#
#       it ' -> does not allow you to request a tour when not logged in' do
#         #CAN YOU REQUEST TOURS IF YOU HAVENT SIGNED UP?
#         visit('/')
#         expect(page).not_to have_content('Request a tour from a local')
#       end
#
#       it ' -> does not allow you to see your requests when not logged in' do
#         visit('/')
#         expect(page).not_to have_content('My requests')
#       end
#
#     end
#
#     context '===> when logged in' do
#
#       before(:each) do
#         signup
#       end
#
#       it '-> has a \'Request a tour link that opens a form on the INDEX page' do
#         expect(page).to have_css('.gm-style')
#
#         visit('/')
#         click_link 'Request a tour'
#         expect(page).to have_content('Request a tour from a local')
#       end
#
#       xit '-> has a \'Request a tour link that opens a form on the REQUESTS page' do
#
#         expect(page).to have_css('.gm-style')
#
#         click_link 'My requests'
#         click_link 'Request a tour'
#         expect(page).to have_content('Request a tour from a local')
#       end
#
#       xit '-> has a \'Request a tour link that opens a form on the EDIT PROFILE page' do
#         expect(page).to have_css('.gm-style')
#         visit('/users/edit')
#         click_link 'Request a tour'
#         expect(page).to have_content('Request a tour from a local')
#       end
#
#       it '-> no longer crashes when you try to access \'My requests\' when you have not made any.' do
#         click_link 'My requests'
#         expect(page).to have_content('You have not made any requests yet.')
#       end
#
#     end
#
# =======
  it 'describes the whole user flow of requesting a tour' do
    visit('/')
    expect(page).not_to have_content('Request a tour from a local')
    expect(page).not_to have_content('My requests')
    signup
    expect(page).to have_css('.gm-style')
    click_link 'My requests'
    expect(page).to have_content('You have not made any requests yet.')
    visit('/')
    request_tour
    expect(page).to_not have_content('Request a tour from a local')
    expect(page).to have_content('Request submitted')
    click_link 'My requests'
    expect(page).to have_content('London')
    expect(page).to have_content('Details: great times wanted')
    click_link 'Update'
    fill_in :'request[location]', with: 'Essex'
    fill_in :'request[description]', with: 'bad times wanted'
    click_button 'Submit'
    expect(page).to have_content('Details: bad times wanted')
    expect(page).to have_content('Request updated successfully')
    click_link 'Delete'
    expect(page).to_not have_content('Details: bad times wanted')
    expect(page).to have_content('Request deleted successfully')

    # Expiration
    visit('/')
    expect(page).to have_css('.gm-style')
    request_tour
    expect(page).to have_content('Request submitted')
    travel 5.days
    click_link('My requests')
    expect(page).to_not have_content('London')

    # To test another user
    visit('/')
    expect(page).to have_css('.gm-style')
    request_tour
    expect(page).to have_content('Request submitted')
    click_link 'Logout'
    # another user
    signup("Jex", "Corbyn", "CorbynistaCommie", "E8 2BB", 'corbyn@labout.com', "littleredbook" )
    expect(page).to have_css('.gm-style')
    click_link('My requests')
    expect(page).not_to have_content('London')
    expect(page).not_to have_content('Details: great times wanted')
    expect(page).to_not have_content('Update')
    expect(page).to_not have_content('Delete')

    # reply_to_request
    # click_link "Logout"
    # signin
    # click_link 'My requests'
    # # visit('/requests')
    # click_link 'Choose'
    # expect(page).to have_content('Reply chosen')
    # expect(page).to_not have_content('Choose')
    # # expect(page).to have_css [x]
# >>>>>>> ab2455b4d00bfcf6b41d887fcc299dff5748a8a3
  end


  xit '-> has a location autocomplete box from Google Maps' do
    fill_in :location, with: 'Lond'
    expect(page).to have_content('London')
  end

  xit '-> raises an error if no location or budget is supplied' do
    expect(page).to have_content('Please enter a location to request a tour')
    expect(page).to have_content('Please enter a budget to request a tour')
  end

# <<<<<<< HEAD
#   context '==> interacting with replied requests' do
#
#     xit '-> user can choose only one reply' do
#       click_link "Logout"
#       signup
#       # cannot find them in '/requests' they are now on the map.
#       reply_to_request
#       click_link "Logout"
#       signin
#       click_link 'My requests'
#       # visit('/requests')
#       click_link 'Choose'
#       expect(page).to have_content('Reply chosen')
#       expect(page).to_not have_content('Choose')
#       # expect(page).to have_css [x]
#     end
# =======
  xit '-> a user\'s request won\'t expire if it\'s been replied to' do
    click_link 'Logout'
    signup("Jimmy", "Hendrix", "hendrix_fan", "SW1 8AP", "bobbybrown@aol.com", "password")
    click_link('My requests')
    reply_to_request
    Timecop.travel(5.days.from_now)
    expect(page).to have_content('Duration: 2 hours')
    expect(page).to have_content('Cost: £20')
    expect(page).to have_content('Meeting point: London')
  end

end
