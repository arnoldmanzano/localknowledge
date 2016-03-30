class ReviewsController < ApplicationController

  def create
    @review = Review.new(review_params)
    @review.reply = Reply.find(params[:reply_id])
    @review.user = User.find(params[:user_id])
    @review.save
    flash[:alert] = 'Review submitted'
    redirect_to requests_path
  end

  def review_params
    params.require(:review).permit(:rating, :description)
  end

end
