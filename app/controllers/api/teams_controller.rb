class Api::TeamsController < ApplicationController

  def index
    render json: current_user.team.users
  end

  def destroy
    User.find(params[:id]).destroy
  end

  def update
    user = team.users.find(params[:id])
    if user.update(user_team_params)
      render json: user
    else
      render json: user.errors, status: :unprocessable_entity
    end
  end

  private

  def user_team_params
    params.require(:user).permit(:name, :email, :phone)
  end
end
