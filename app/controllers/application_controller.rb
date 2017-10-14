class ApplicationController < ActionController::API
  include DeviseTokenAuth::Concerns::SetUserByToken
  before_action :configure_permitted_parameters, if: :devise_controller?

  def unprocessable(errors)
    render json: { errors: errors }, status: :unprocessable_entity
  end

  protected
    def configure_permitted_parameters
      devise_parameter_sanitizer.permit(:sign_up, keys: [:name, :phone])
      devise_parameter_sanitizer.permit(:account_update, keys: [:name, :image,
        :phone, :communication_preferences, :company_name])
    end
end
