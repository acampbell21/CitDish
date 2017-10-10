require 'rails_helper'

RSpec.describe Client, type: :model do
  describe 'validations' do
      it { should validate_presence_of(:name, :email, :phone) }
    end

  describe 'associations' do
      it { should have_one(:address) }
      it { should belong_to(:user) }
    end
end
