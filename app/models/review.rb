class Review < ActiveRecord::Base
  belongs_to :user
  belongs_to :reply

  def average_stars(rating)
    remainder = (5 - rating)
    '★' * rating + "☆" * remainder
  end

end
