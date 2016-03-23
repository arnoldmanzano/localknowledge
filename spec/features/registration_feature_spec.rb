require 'rails_helper'

feature 'Registration and users' do

  context '- signing up' do

    it '-> allows users to add a profile picture when signing up' do
      signup
      expect(current_path).to eq('/')
      expect(page).to have_css("img[src*='marley.jpeg']")
    end
  end

  context '- updating profile' do

    it '-> allows users to edit their profile picture after signing up' do
      signup
      click_link 'Edit Profile'
      attach_file 'user[avatar]', Rails.root.join('spec','fixtures', 'obama-best.png')
      fill_in :'user[current_password]', with: 'password'
      click_button 'Update'
      expect(current_path).to eq('/')
      expect(page).to have_css("img[src*='obama-best.png']")
    end
  end

end
