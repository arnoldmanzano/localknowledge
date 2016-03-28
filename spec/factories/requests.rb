FactoryGirl.define do
  factory :request do
    trait :location do
      trait "MyString"
    end
    trait :description do
      trait "MyText"
    end
    trait :request_date do
      trait "23/6/2016"
    end
    user

    #A factory to build a request with a reply.

    factory :request_with_replies do

      transient do
        replies_count 2
      end
      after(:create) do |request, evaluator|
        create_list(:reply, evaluator.replies_count, request: request)
      end
    end
  end
end
