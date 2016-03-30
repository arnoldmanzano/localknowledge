FactoryGirl.define do
  factory :review do
    rating 1
    description "MyText"
    user
  end
end
