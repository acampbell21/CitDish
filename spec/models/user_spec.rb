# == Schema Information
#
# Table name: users
#
#  id                        :integer          not null, primary key
#  provider                  :string           default("email"), not null
#  uid                       :string           default(""), not null
#  encrypted_password        :string           default(""), not null
#  reset_password_token      :string
#  reset_password_sent_at    :datetime
#  remember_created_at       :datetime
#  sign_in_count             :integer          default(0), not null
#  current_sign_in_at        :datetime
#  last_sign_in_at           :datetime
#  current_sign_in_ip        :string
#  last_sign_in_ip           :string
#  confirmation_token        :string
#  confirmed_at              :datetime
#  confirmation_sent_at      :datetime
#  unconfirmed_email         :string
#  name                      :string
#  image                     :string
#  email                     :string
#  phone                     :string           not null
#  role                      :string           default("user"), not null
#  communication_preferences :jsonb
#  tokens                    :json
#  created_at                :datetime         not null
#  updated_at                :datetime         not null
#

require 'rails_helper'

RSpec.describe User, type: :model do
  describe 'validations' do
    it { should validate_presence_of(:name, :phone, :role) }
    it { should validate_inclusion_of(:role, in: %w(user admin)) }

   describe 'associations' do
    it { should have_many(:projects, :clients) }
  end
end
end
