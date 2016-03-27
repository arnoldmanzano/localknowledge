FactoryGirl.define do
  factory :request do
    location "MyString"
    description "MyText"
    request_date "23/6/2016"
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
