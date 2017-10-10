class Api::ClientsController < ApplicationController
  def index
    render json: current_user.clients
  end
end
