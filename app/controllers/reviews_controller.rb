class ReviewsController < ApplicationController

  def new
    @request = Request.find(params[:id])
    @reply = Reply.find(params[:reply_id])
    @review = Review.new
  end

  def create
    @request = Request.find(params[:request_id])
    @reply = Reply.find(params[:reply_id])
    @review = Review.new(review_params)
    @review.user = current_user
    @review.reply = @reply
    @review.save
    flash[:alert] = 'Review submitted'
    redirect_to requests_path
  end

  def review_params
    params.require(:review).permit(:rating, :description)
  end

end
