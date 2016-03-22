class RequestsController < ApplicationController

  def index
    @requests = Request.all
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

  def request_params
    params.require(:request).permit(:location, :description)
  end
end
