FactoryGirl.define do

  # reply factory with a `belongs_to` association to the user and request
  factory :reply do
    trait :meeting_point do
      trait "MyString"
    end
    trait :duration do
      trait 1
    end
    trait :cost do
      trait 1
    end
    trait :stopoffs do
      trait "MyText"
    end
    trait :description do
      trait "MyText"
    end
    user
    request
  end
end
