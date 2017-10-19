class InvitationsController < ApplicationController
  
    def accept
      user = User.accept_invitation!(invite_params)
      render json: user
    end
  
    def invite
      user = User.invite!(user_params)
      user.update(team_id: current_user.team_id)
      render json: user
    end
  
    private
      def user_params
        params.require(:user).permit(:name, :phone, :role, :email, :team_id)
      end
  
      def invite_params
        params.require(:invite).permit(:password, :password_confirmation, :invitation_token)
      end
  end