class AddReplyIdToReviews < ActiveRecord::Migration
  def change
    add_reference :reviews, :reply, index: true, foreign_key: true
  end
end
