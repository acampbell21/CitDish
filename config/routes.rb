Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'api/auth'

  namespace :api do
    get 'opentok_session', to: 'opentok#create_session'
    get 'team', to: 'teams#index'
    get 'salesforce_creds', to: 'salesforce#creds'
    post 'oauth', to: 'oauth#create'
    get 'oauth/clients', to: 'oauth#clients'
    put 'oauth/disconnect_social', to: 'oauth#disconnect_social'
    put 'oauth/disconnect_crm', to: 'oauth#disconnect_crm'
    put 'oauth/set_linkedin_profile_pic', to: 'oauth#set_linkedin_profile_pic'
    get 'clients', to: 'clients#index'
    post 'images/user_image', to: 'images#add_user_image'
    post 'images/company_image', to: 'images#add_company_image'
    put '/team/:user_id', to: 'teams#update'
    delete '/team/:user_id', to: 'teams#destroy'
  end

  post '/invitation/send', to: 'invitations#invite'
  post '/invitation/accept', to: 'invitations#accept'

  #Do not place any routes below this one
  get '*other', to: 'static#index'
end
