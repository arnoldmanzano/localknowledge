class Review < ActiveRecord::Base
  belongs_to :user
  belongs_to :reply

  def build_review(attributes = {}, user)
    attributes[:user] ||= user
    reviews.build(attributes)
  end
end
