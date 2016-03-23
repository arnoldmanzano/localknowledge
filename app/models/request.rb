class Request < ActiveRecord::Base

  belongs_to :user
  has_many :replies, dependent: :destroy
  before_create :set_expiration_date

  def build_request(attributes = {}, user)
    attributes[:user] ||= user
    replies.build(attributes)
  end

  def set_expiration_date
    self.expiration =  Date.today + 5.days
  end

end
