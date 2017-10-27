class Api::ClientsController < ApplicationController
  before_action :set_client, only: [:show, :edit, :update, :destroy]

  def index
    render json: current_user.clients
  end

  def show
    # @client = current_user.clients.find(params[:id]) - BEFORE ACTION
    
    render json: @client
  end
  # TODO: implement the show action
  # TODO: the show action is going to find the current_user.clients.find(params[:id])
  # TODO: return the json of that client

  def create
    client = current_user.clients.new(params[:id])
    if client.save
      redirect_to clients_path
    else
      render :new
    end
  end
  # TODO: implement the create action
  # TODO: the create action is going to find the current_user.clients.find(params[:id])
  # TODO: return the json of that client
  # TODO: if client.from_crm == true we need to eventually make the CRM API call to create the client

  def update
    if clients.update(client_params)
      redirect_to clients_path
    else
      render :edit
    end
  end
  # TODO: implement the update action
  # TODO: the update action is going to find the current_user.clients.find(params[:id])
  # TODO: edit the user and update our redux store
  # TODO: if client.from_crm == true we need to eventually make the CRM API call to edit the client

  def destroy
    current_user.client.find(params[:id]).destroy
  end
  # TODO: implement the destroy action
  # TODO: the destroy action is going to find the current_user.clients.find(params[:id])
  # TODO: delete user and update our redux store
  # TODO: if client.from_crm == true we need to eventually make the CRM API call to delete the client

  # current_user.crm_oauth != nil then we know they are connected to a CRM so we should be making api calls
  # if current_user.crm_oauth == nil then they havent connected to a CRM and then we just do all our local database stuff with no API calls
  private

    def set_client
      @client = current_user.clients.find(params[:id])
    end

    def client_params
      params.require(:client).permit(:id, :name, :email, :phone, :user_id,
      :created_at, :updated_at, :uid, :from_crm, :mobile_phone,
      :mailing_address, :home_phone, :title, :notes)
    end

  # TODO: make sure you write controller specs once you are done.
end
