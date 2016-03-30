class RequestsController < ApplicationController
  respond_to :html, :json
  before_filter :authenticate_user!

  def index
    @requests = Request.where("user_id = ? AND expiration > ?", current_user, Time.now)
    @review = Review.new
    # @reviews = Review.where("user_id = ?", current_user)
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
    params.require(:request).permit(:location, :lat, :lng,
      :description, :budget,
      :disability_access, :children, :luggage, :airport_access,
      :request_date, :tour_duration,
      :time_of_day, :tour_time_start,
      :tour_duration, :tour_time_end, :group_size)
  end

end
