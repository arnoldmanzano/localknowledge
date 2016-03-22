FactoryGirl.define do
  factory :reply do
    meeting_point "MyString"
    duration 1
    cost 1
    stopoffs "MyText"
    description "MyText"
    request nil
  end
end
