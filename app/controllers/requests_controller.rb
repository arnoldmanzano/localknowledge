class RequestsController < ApplicationController
  respond_to :html, :json

  def index
    @requests = Request.where("user_id = ? AND expiration > ?", current_user, Time.now)
    require 'pry'; binding.pry

    # @requests = Request.where(["expiration > ?", Time.now])
    # Request.where(:user_id => current_user, :expiration => "expiration > Time.now")
  end

  def create
    @request = current_user.requests.new(request_params)
    flash[:notice] = 'Your request has been successfully submitted.' if @request.save
    render json: @request.to_json
    # respond_with(@request)
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
