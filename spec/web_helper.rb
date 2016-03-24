def signup(f_name: "Bob", l_name: "Marley", username: 'Iron_Lion_Zion', postcode: 'W12 7JQ', email: 'bob@bob.com', password: "password" )
  visit('/')
  click_link('Sign Up')
  attach_file 'user[avatar]', Rails.root.join('spec','fixtures','marley.jpeg')
  within(:css, '#signUpModal') do
    fill_in :'user[f_name]', with: f_name
    fill_in :'user[l_name]', with: l_name
    fill_in :'user[username]', with: username
    fill_in :'user[postcode]', with: postcode
    fill_in :'user[email]', with: email
    fill_in :'user[password]', with: password
    fill_in :'user[password_confirmation]', with: password
    click_button 'Sign up'
  end
end

def reply_to_request
  click_link 'Reply'
  fill_in :reply_meeting_point, with: 'London'
  fill_in :reply_duration, with: 2
  fill_in :reply_cost, with: 20
  fill_in :reply_stopoffs, with: 'city gates, gastropub'
  fill_in :reply_description, with: 'A fun history tour'
  click_button 'Reply'
end

def request_tour
  # click_link 'Request a tour'
  visit('/requests/new')
  fill_in :'request[location]', with: 'London'
  fill_in :'request[description]', with: 'great times wanted'
  click_button 'Submit'
end
