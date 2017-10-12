class Api::OauthController < ApplicationController
  def create
    oauth_result = params[:oauth_result]

    if oauth_result[:_provider] == 'linkedin'
      provider = 'linkedin'
      current_user.update(social_oauth: oauth_result, image: oauth_result[:_profile][:profilePicURL])
    else
      provider = 'salesforce'
      current_user.update(crm_oauth: oauth_result)
    end

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

  def disconnect_social
    current_user.update(social_oauth: nil)
    render json: current_user
  end

  def disconnect_crm
    current_user.update(crm_oauth: nil)
    render json: current_user
  end

  def set_linkedin_profile_pic
    current_user.update(image: current_user.social_oauth["_profile"]["profilePicURL"])
    render json: current_user
  end
end
