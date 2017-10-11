# == Schema Information
#
# Table name: users
#
#  id                        :integer          not null, primary key
#  provider                  :string           default("email"), not null
#  uid                       :string           default(""), not null
#  encrypted_password        :string           default(""), not null
#  invitation_token          :string
#  invitation_created_at     :datetime
#  invitation_sent_at        :datetime
#  invitation_accepted_at    :datetime
#  invitation_limit          :integer
#  invited_by_id             :integer
#  invited_by_type           :string
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
#  team_id                   :integer
#  tokens                    :json
#  crm_oauth                 :jsonb
#  social_oauth              :jsonb
#  created_at                :datetime         not null
#  updated_at                :datetime         not null
#  company_image             :string
#  company_name              :string
#

class User < ActiveRecord::Base
  # Include default devise modules.
  devise :database_authenticatable, :registerable,
          :recoverable, :rememberable, :trackable, :validatable,
          :omniauthable, :invitable
  include DeviseTokenAuth::Concerns::User

  validates_presence_of :name, :phone, :role
  validates_inclusion_of :role, in: %w(user admin)

  belongs_to :team

  has_many :projects, dependent: :destroy
  has_many :clients, dependent: :destroy
end
