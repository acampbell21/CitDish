class Api::SalesforceController < ApplicationController
  def creds
    render json: { appId: ENV['SALESFORCE_APP_ID'], oauthCallbackUrl: ENV['SALESFORCE_CALLBACK_URL']}
  end
end
