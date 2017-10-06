require 'rails_helper'

RSpec.describe Api::TeamsController, type: :controller do
  login_user

  let(:valid_attributes) {
    { name: 'Ric Flair', email: 'ric@flair.com', phone: 8019999999}
  }

  let(:invalid_attributes) {
    { name: '', email: '', phone: ''}
  }

  describe "GET #index" do
    it "returns http success" do
      get :index
      expect(response).to have_http_status(:success)
    end
  end

  # describe "DELETE #destroy" do
  #   it "destroys the requested bank_account" do
  #     current_user.team = current_user.team.users.create! valid_attributes
  #     expect {
  #       delete :destroy, params: {id: current_user.team.users.id}
  #     }.to change(Team, :count).by(-1)
  #   end

  #   it "redirects to the team list" do
  #     current_user.team = current_user.team.users.create! valid_attributes
  #     delete :destroy, params: {id: current_user.team.users.id}
  #     expect(response).to redirect_to(team_url)
  #   end
  # end
end
