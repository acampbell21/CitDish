class Api::OpentokController < ApplicationController
  before_action :set_client

  def create_session
    session = @opentok.create_session
    render json: { session: session, token: session.generate_token}
  end

  private
    def set_client
      @opentok = OpenTok::OpenTok.new(ENV['OPENTOK_API_KEY'], ENV['OPENTOK_API_SECRET'])
    end
end
