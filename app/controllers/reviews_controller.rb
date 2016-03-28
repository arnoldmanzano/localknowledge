class ReviewsController < ApplicationController

  def new
    @request = Request.find(params[:id])
    @reply = Reply.find(params[:reply_id])
    @review = Review.new
  end

  def create
    @request = Request.find(params[:id])
    @reply = Reply.find(params[:reply_id])
    @review = @reply.build_review(review_params, current_user)
    @review.save
    redirect_to requests_path
  end

  def review_params
    params.require(:reply).permit(:rating, :description)
  end

end
