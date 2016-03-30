class Reply < ActiveRecord::Base
  belongs_to :request
  belongs_to :user
  has_one :review
  has_many :pictures, dependent: :destroy

  def find_user(user_id)
    @username = User.find(user_id).username
  end

  def set_chosen
    self.chosen = true
    self.save
    self.request.resolved = true
    self.request.save
  end

end
