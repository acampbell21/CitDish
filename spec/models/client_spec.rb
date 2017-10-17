# == Schema Information
#
# Table name: clients
#
#  id              :integer          not null, primary key
#  name            :string           not null
#  email           :string
#  phone           :string
#  user_id         :integer
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  uid             :string           not null
#  from_crm        :boolean          default(TRUE)
#  mobile_phone    :string
#  mailing_address :jsonb
#  home_phone      :string
#  title           :string
#  notes           :jsonb
#

require 'rails_helper'

RSpec.describe Client, type: :model do
  describe 'validations' do
    it { should validate_presence_of(:name) }
  end

  describe 'associations' do
    it { should have_one(:address) }
    it { should belong_to(:user) }
  end
end
