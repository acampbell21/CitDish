# == Schema Information
#
# Table name: addresses
#
#  id         :integer          not null, primary key
#  street     :string           not null
#  city       :string           not null
#  state      :string           not null
#  zip        :string           not null
#  client_id  :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

require 'rails_helper'

RSpec.describe Address, type: :model do
  describe 'associations' do
    it { should belong_to(:client) }
  end

  describe 'validations' do
    it { should validate_presence_of(:street) }
    it { should validate_presence_of(:city) }
    it { should validate_presence_of(:state) }
    it { should validate_presence_of(:zip) }
  end
end
