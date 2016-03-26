def signup(f_name = "Bob", l_name = "Marley", username = 'Iron_Lion_Zion', postcode = 'W12 7JQ', email = 'bob@bob.com', password ="password" )
  visit('/users/sign_up')
  attach_file 'user[avatar]', Rails.root.join('spec','fixtures','marley.jpeg')
  fill_in :'user[f_name]', with: f_name
  fill_in :'user[l_name]', with: l_name
  fill_in :'user[username]', with: username
  fill_in :'user[postcode]', with: postcode
  fill_in :'user[email]', with: email
  fill_in :'user[password]', with: password
  fill_in :'user[password_confirmation]', with: password
  click_button 'Sign up'
end

def reply_to_request
  click_link 'Reply'
  fill_in :'reply[meeting_point]', with: 'London'
  fill_in :'reply[duration]', with: 2
  fill_in :'reply[cost]', with: 20
  fill_in :'reply[stopoffs]', with: 'city gates, gastropub'
  fill_in :'reply[description]', with: 'A fun history tour'
  click_button 'Reply'
end

def request_tour
  click_link 'Request a tour'
  fill_in :location, with: 'London'
  fill_in :description, with: 'great times wanted'
  click_button 'Submit'
end
