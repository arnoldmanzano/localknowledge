class RequestsController < ApplicationController

  respond_to :html, :json
  before_filter :authenticate_user!

  def index
    @requests = Request.where("user_id = ? AND expiration > ?", current_user, Time.now)
    @review = Review.new
  end

  def create
    @request = current_user.requests.new(request_params)
    flash[:notice] = 'Your request has been successfully submitted.' if @request.save
    render json: @request.to_json
  end

  def edit
    @request = Request.find(params[:id])
  end

  def update
    @request = Request.find(params[:id])
    if @request.user_id == current_user.id
      @request.update(request_params)
      flash[:notice] = 'Request updated successfully'
    else
      flash[:alert] = 'Only owner can update request'
    end
    redirect_to requests_path
  end

  def destroy
    @request = Request.find(params[:id])
    if @request.user_id == current_user.id
      @request.destroy
      flash[:notice] = 'Request deleted successfully'
    else
      flash[:alert] = 'Only owner can delete request'
    end
    redirect_to requests_path
  end

  private

  def request_params
    params.require(:request).permit(:location, :description, :budget, :request_date, :lat, :lng)
  end

end
