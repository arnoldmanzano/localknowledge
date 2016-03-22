class RepliesController < ApplicationController

  def index
  end

  def new
    @request = Request.find(params[:request_id])
    @reply = Reply.new
  end

  def create
    @request = Request.find(params[:request_id])
    @reply = @request.build_request(reply_params, current_user)
    if @reply.save
      redirect_to requests_path
    else
      if @reply.errors[:user]
        redirect_to requests_path
      else
        render :new
      end
    end
  end

  private

  def reply_params
    params.require(:reply).permit(:meeting_point, :duration, :cost, :stopoffs, :description)
  end

end
