class Review < ActiveRecord::Base
  belongs_to :user
  belongs_to :reply

  validates_presence_of :user

end
