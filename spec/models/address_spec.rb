require 'rails_helper'

RSpec.describe Address, type: :model do
   describe 'associations' do
    it { should belong_to(:client) }

    describe 'validations' do
    it { should validate_presence_of(:street, :city, :state, :zip) }
  end
end
