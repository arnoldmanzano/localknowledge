
# Factories to mock the following relationships - have kept in comments
# in case anybody else would like to follow what has been done without looking up
# the documentation!

# has_many :requests, dependent: :destroy
# has_many :replies, dependent: :destroy
# has_many :replied_requests, through: :replies, source: :request


FactoryGirl.define do
  factory :user do
    sequence(:email) { |email| "#{email}@anemail.com"}
    f_name  "Factory"
    l_name  "User"
    password "password"
    username "factoryUser"
    # user_with_requests will create request data after the user has been created
    factory :user_with_requests do
      # requests_count is declared as a transient attribute and available in
      # attributes on the factory, as well as the callback via the evaluator
      transient do
        requests_count 2
      end
      # the after(:create) yields two values; the user instance itself and the
     # evaluator, which stores all values from the factory, including transient
     # attributes; `create_list`'s second argument is the number of records
     # to create and we make sure the user is associated properly to the request
      after(:create) do |user, evaluator|
        create_list(:request, evaluator.requests_count, user: user)
      end
    end

      factory :user_with_replied_requests do

        transient do
          replied_requests_count 2
        end

        after(:create) do |user, evaluator|
          create_list(:request_with_replies, evaluator.replied_requests_count, user: user)
        end

      end


    factory :user_with_replies do
      transient do
        replies_count 2
      end
      after(:create) do |user, evaluator|
        create_list(:reply, evaluator.replies_count, user: user)
      end
    end
  end
end
