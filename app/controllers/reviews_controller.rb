class ReviewsController < ApplicationController

  def create
    @review = Review.new(review_params)
    @reply = Reply.find(params[:reply_id])
    @review.reply = @reply
    @review.user = @reply.user
    @review.save
    flash[:alert] = 'Review submitted'
    redirect_to requests_path
  end

  def review_params
    params.require(:review).permit(:rating, :description)
  end

end
