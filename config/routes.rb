Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'api/auth'

  namespace :api do
    get 'opentok_session', to: 'opentok#create_session'
    get 'team', to: 'teams#index'
    get 'salesforce_creds', to: 'salesforce#creds'
    post 'oauth', to: 'oauth#create'
    get 'oauth/clients', to: 'oauth#clients'
    get 'clients', to: 'clients#index'
  end

  post '/invitation/send', to: 'invitations#invite'
  post '/invitation/accept', to: 'invitations#accept'

  #Do not place any routes below this one
  get '*other', to: 'static#index'
end
