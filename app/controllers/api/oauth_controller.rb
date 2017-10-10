class Api::OauthController < ApplicationController
  def create
    current_user.update(crm_oauth: params[:oauth_result])
    render json: current_user
  end

  def clients
    client = Restforce.new(oauth_token: current_user.crm_oauth['accessToken'],
                           instance_url: current_user.crm_oauth['instanceURL'],
                           api_version: '38.0')
    result = client.query('select id, name from contact')
    
    if result.any?
      current_user.clients.where(from_crm: true).destroy_all
      # TODO: I think we need to paginate the results so we get all clients
      result.each { |client| current_user.clients.create(uid: client['Id'], name: client['Name']) }
    end

    render json: current_user.clients
  end
end
