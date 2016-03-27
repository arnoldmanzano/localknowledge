# FactoryGirl.define do
#   factory :reply do
#     meeting_point "MyString"
#     duration 1
#     cost 1
#     stopoffs "MyText"
#     description "MyText"
#     request
#     association :user_id, factory: :user
#   end
# end

FactoryGirl.define do

  # reply factory with a `belongs_to` association to the user and request
  factory :reply do
    meeting_point "MyString"
    duration 1
    cost 1
    stopoffs "MyText"
    description "MyText"
    user
    request
  end

end
