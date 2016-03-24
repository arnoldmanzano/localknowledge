class RequestsController < ApplicationController

  def index
    requests = Request.where(["expiration > ?", Time.now])
    render json: requests.to_json
  end

  def new
    @request = Request.new
  end

  def create
    @request = current_user.requests.create(request_params)
    if @request.valid?
      redirect_to('/')
      flash[:notice] = 'Request submitted successfully'
    else
      flash[:alert] = 'Oops something went wrong!'
    end
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
    params.require(:request).permit(:location, :description, :budget, :request_date)
  end

end
