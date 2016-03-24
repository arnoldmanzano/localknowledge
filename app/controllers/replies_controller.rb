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
      @request.set_expiration_date
      redirect_to requests_path
    else
      if @reply.errors[:user]
        redirect_to requests_path
      else
        render :new
      end
    end
  end

  def edit
    @request = Request.find(params[:request_id])
    @reply = Reply.find(params[:id])
  end

  def update
    @request = Request.find(params[:request_id])
    @reply = Reply.find(params[:id])
    if @reply.user_id == current_user.id
      @reply.update(reply_params)
    else
      flash[:notice] = 'Only owner can update replies'
    end
    redirect_to requests_path
  end

  def destroy
    @request = Request.find(params[:id])
    @reply = Reply.find(params[:id])
    if @reply.user_id == current_user.id
      @reply.destroy
      flash[:notice] = 'Request deleted successfully'
    else
      flash[:alert] = 'Only owner can delete request'
    end
    redirect_to requests_path
  end

  def reply_params
    params.require(:reply).permit(:meeting_point, :duration, :cost, :stopoffs, :description)
  end

end
