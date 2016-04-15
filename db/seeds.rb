# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

arnold = User.create(
  f_name: 'Arnold',
  l_name: 'Manzano',
  username: 'arnoldmanzano',
  email: 'arnold@email.com',
  password: '12345678',
  phone: '+441234567890',
  postcode: 'E1'
)
# :avatar

alex = User.create(
  f_name: 'Alex',
  l_name: 'Avlonitis',
  username: 'alexavlonitis',
  email: 'alex@email.com',
  password: '12345678',
  phone: '+441234567890',
  postcode: 'E1'
)

marcus = User.create(
  f_name: 'Marcus',
  l_name: 'Bullock',
  username: 'marcus',
  email: 'marcus@email.com',
  password: '12345678',
  phone: '+441234567890',
  postcode: 'E1',
  # avatar: File.new("#{Rails.root}/spec/fixtures/default_user.png")
)
viola = User.create(
  f_name: 'Viola',
  l_name: 'Crellin',
  username: 'violacrellin',
  email: 'viola@email.com',
  password: '12345678',
  phone: '+441234567890',
  postcode: 'E1'
)

marcus_request = Request.create(
  user: marcus,
  location: "Aldgate East Station, Leman Street, London, United Kingdom",
  description: "I'm new in London, I would like to see the highlights of the City",
  budget: 30,
  request_date: "2016-04-02 23:00:00",
  lat: "51.5191124",
  lng: "-0.0745065",
  group_size: 2,
  time_of_day: "All Day"
)

Request.create(
  user: viola,
  location: "Makers Academy, Commercial Street, City of London, London, United Kingdom",
  description: "Street Art and Local Pubs",
  budget: nil,
  request_date: "2016-04-02 23:00:00",
  lat: "51.5152843",
  lng: "-0.0722437",
  time_of_day: "All Day"
)

Request.create(
  user: alex,
  location: "Liverpool Street, London, United Kingdom",
  description: "City Tour",
  budget: nil,
  request_date: "2016-04-02 23:00:00",
  lat: "51.5174096",
  lng: "-0.08301770000000001",
  time_of_day: "All Day"
)

Reply.create(
  request: marcus_request,
  user: alex,
  meeting_point: "Regent's Park",
  duration: "3",
  cost: "10",
  stopoffs: "Hyde Park",
  description: "Park tours"
)

Review.create(
  user: arnold, rating: 5, description: 'Friendly fellow'
)
Review.create(
  user: arnold, rating: 5, description: 'Very helpful'
)
Review.create(
  user: arnold, rating: 5, description: 'Knows all the good sights'
)
Review.create(
  user: arnold, rating: 5, description: 'Highly Recommended'
)
Review.create(
  user: arnold, rating: 5, description: 'A+'
)
Review.create(
  user: marcus, rating: 5, description: 'Friendly fellow'
)
Review.create(
  user: marcus, rating: 5, description: 'Highly Recommended'
)
Review.create(
  user: marcus, rating: 5, description: 'A+'
)
