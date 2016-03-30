class RepliesController < ApplicationController

  before_filter :authenticate_user!

  def c_reply
    reply = Reply.find(params[:id])
    pics = reply.pictures.map(&:image_url)
    render json: pics.to_json
  end

  def index
    @replies = current_user.replies.all
  end

  def new
    @request = Request.find(params[:request_id])
    @reply = Reply.new
  end

  def create
    @request = Request.find(params[:request_id])
    @reply = @request.build_reply(reply_params, current_user)
    if @reply.save
      if params[:images]
        params[:images].each do |image|
          @reply.pictures.create(image: image)
        end
      end
      @request.set_expiration_date
      @request.save
      redirect_to '/'
    else
      if @reply.errors[:user]
        redirect_to requests_path
      else
        render :new
      end
    end
  end

  def choose
    @request = Request.find(params[:request_id])
    @reply = Reply.find(params[:id])
    @reply.set_chosen
    flash[:notice] = 'Reply chosen'
    redirect_to requests_path
  end

  def edit
    @request = Request.find(params[:request])
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
    @request = Request.find(params[:request_id])
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
