def signup
  visit('/users/sign_up')
  attach_file 'user[avatar]', Rails.root.join('spec','fixtures','marley.jpeg')
  fill_in :'user[f_name]', with: 'Bob'
  fill_in :'user[l_name]', with: 'Marley'
  fill_in :'user[username]', with: 'Iron_Lion_Zion'
  fill_in :'user[email]', with: 'bob@bob.com'
  fill_in :'user[password]', with: 'password'
  fill_in :'user[password_confirmation]', with: 'password'
  click_button 'Sign up'
end

def add_tour
  click_link 'Advertise a tour'
  fill_in :location, with: 'London'
  fill_in :theme, with: 'history'
  fill_in :duration, with: 2
  fill_in :cost, with: 20
  fill_in :stopoffs, with: 'city gates, gastropub'
  fill_in :description, with: 'A fun history tour'
  click_button 'Add tour'
end 
