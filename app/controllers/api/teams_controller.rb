class Api::TeamsController < ApplicationController
  before_action :find_user, only: [:update, :destroy]

  def index
    render json: current_user.team.users
  end
  
  def destroy
    @user.destroy
    render json: current_user.team.users
  end
  
  def update
    if @user.update(user_team_params)
      render json: @user
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  private
    def user_team_params
      params.require(:user).permit(:name, :phone, :role)
    end

    def find_user
      @user = current_user.team.users.find(params[:user_id])
    end
end
