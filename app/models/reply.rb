class Reply < ActiveRecord::Base
  belongs_to :request
  belongs_to :user

  def find_user(user_id)
    @username = User.find(user_id).username
  end

end
