class UsersController < ApplicationController
  def index
    users = User.all
    render json: users.to_json(include: [:requests])
  end

  def c_user
    if current_user
      c_user = User.find(current_user.id)
      render json: c_user.to_json(only: [:id,:fname,:lname,:username], :methods => [:avatar_url])
    else
      flash[:alert] = 'Please sign in '
      redirect_to '/'
    end
  end
end
