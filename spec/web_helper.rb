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
