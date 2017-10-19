require 'rails_helper'

RSpec.describe Api::TeamsController, type: :controller do
  login_admin

  let(:valid_attributes) {
    { name: 'Ric Flair', 
      email: 'ric@flair.com', 
      phone: 8019999999, 
      password: 'password', 
      team_id: 1,
      role: 'user',
    }
  }

  let(:invalid_attributes) {
    { name: '', 
      email: '', 
      phone: '',
      password: '',
      role: '',
    }
  }

  describe "GET #index" do
    it "returns http success" do
      get :index
      expect(response).to have_http_status(:success)
    end

    it 'returns all members on the team' do
      user = FactoryGirl.create(:user, team_id: @user.team.id)
      get :index, params: {id: user.id}
      expect(response).to have_http_status(:success)
    end
  end

  describe "DELETE #destroy" do
    it "destroys the requested user" do
      delete_user = FactoryGirl.create(:user, invitation_token: '1234', team: @user.team)
      expect {
        delete :destroy, params: {user_id: delete_user.id}
        @user.reload
      }.to change(User, :count).by(-1)
      expect(@user.team.users.count).to eq(1)
      expect(@user.team.users.first).to eq(@user)
    end
  end

  describe "PUT #update" do
    let(:new_attributes) {
      { name: 'Tuna Hardy'}
    }

    before(:each) do 
      @update_user = FactoryGirl.create(:user, invitation_token: '1234', team_id: @user.team.id)      
    end

    it "Updates the requested user" do
      put :update, params: { user: new_attributes, user_id: @update_user.id }
      @update_user.reload
      expect(@update_user.name).to eq(new_attributes[:name])
    end

    it 'does not update the requested user' do
      put :update, params: { user_id: @update_user.id, user: new_attributes }
      @update_user.reload
      expect(@update_user.name).to_not eq(invalid_attributes[:name])
    end 
  end
end
