class Request < ActiveRecord::Base

  belongs_to :user
  has_many :replies

  def build_request(attributes = {}, user)
    attributes[:user] ||= user
    replies.build(attributes)
  end

end
