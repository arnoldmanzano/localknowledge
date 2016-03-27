require 'rails_helper'
include Capybara::Angular::DSL

feature 'Making a request for a tour', js:true do

  context '===> accessing the form ' do

    context '===> when not logged in' do

      it ' -> does not allow you to request a tour when not logged in' do
        #CAN YOU REQUEST TOURS IF YOU HAVENT SIGNED UP?
        visit('/')
        expect(page).not_to have_content('Request a tour from a local')
      end

      it ' -> does not allow you to see your requests when not logged in' do
        visit('/')
        expect(page).not_to have_content('My requests')
      end

    end

    context '===> when logged in' do

      before(:each) do
        signup
      end

      it '-> has a \'Request a tour link that opens a form on the INDEX page' do
        expect(page).to have_css('.gm-style')

        visit('/')
        click_link 'Request a tour'
        expect(page).to have_content('Request a tour from a local')
      end

      xit '-> has a \'Request a tour link that opens a form on the REQUESTS page' do
        expect(page).to have_css('.gm-style')

        click_link 'My requests'
        click_link 'Request a tour'
        expect(page).to have_content('Request a tour from a local')
      end

      xit '-> has a \'Request a tour link that opens a form on the EDIT PROFILE page' do
        expect(page).to have_css('.gm-style')

        visit('/users/edit')
        click_link 'Request a tour'
        expect(page).to have_content('Request a tour from a local')
      end

    end

  end

  context '===> filling in the form with validations' do

    before(:each) do
      signup
      expect(page).to have_css('.gm-style')
    end

    xit '-> has a location autocomplete box from Google Maps' do
      fill_in :location, with: 'Lond'
      expect(page).to have_content('London')
    end

    xit '-> raises an error if no location is supplied' do
      click_link 'Request a tour'
      expect(page).to have_content('London')
      expect(page).to have_content('Please enter a location to request a tour')
    end

    xit '-> raises an error if budget is ' do
      click_link 'Request a tour'
      expect(page).to have_content('London')
      expect(page).to have_content('Please enter a location to request a tour')
    end

    it '-> closes the form on submit' do
      click_link 'Request a tour'
      fill_in :location, with: 'London'
      fill_in :description, with: 'great times wanted'
      find('.btn').click
      expect(page).to_not have_content('Request a tour from a local')
    end

  end

  context '===> on form submission, user access to requests', js:true do

    context '===> user access to their own requests' do

      before(:each) do
        signup
        expect(page).to have_css('.gm-style')
        request_tour
      end


      it '-> allows the user to see their tour request' do
        click_link 'My requests'
        expect(page).to have_content('Request for a tour in: London')
        expect(page).to have_content('Details: great times wanted')
      end


      xit '-> a user\'s request will expire after 5 days' do
        Timecop.travel(5.days.from_now)
        click_link('My requests')
        expect(page).to_not have_content('Requested for a tour in: London')
        expect(page).to_not have_content('Details: great times wanted')
      end

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

      it '-> users can update their requests' do
        click_link('My requests')
        click_link 'Update'
        fill_in :'request[location]', with: 'Essex'
        fill_in :'request[description]', with: 'bad times wanted'
        click_button 'Submit'
        expect(page).to have_content('Request for a tour in: Essex')
        expect(page).to have_content('Details: bad times wanted')
        expect(page).to have_content('Request updated successfully')
      end

      it '-> users can delete their requests' do
        click_link 'My requests'
        click_link 'Delete'
        expect(page).to_not have_content('good times wanted')
        expect(page).to have_content('Request deleted successfully')
      end

    end

    context '===> users access to other users requests' do

      before(:each) do
        signup
        expect(page).to have_css('.gm-style')
        request_tour
        click_link 'Logout'
        signup("Jex", "Corbyn", "CorbynistaCommie", "E8 2BB", 'corbyn@labout.com', "littleredbook" )
        expect(page).to have_css('.gm-style')
        click_link 'My requests'
      end

      it '-> does not show requests from other users' do
        expect(page).not_to have_content('Request for a tour in: London')
        expect(page).not_to have_content('Details: great times wanted')
      end

      it '-> only a user can update their own request' do
        expect(page).to_not have_content('Update')
      end

      it '-> only a user can delete their own request' do
        expect(page).to_not have_content('Delete')
      end
    end
  end
end
