# == Schema Information
#
# Table name: teams
#
#  id              :integer          not null, primary key
#  admin_ids       :text
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  payment_user_id :string
#  paid            :boolean
#  trial           :boolean          default(TRUE)
#

FactoryGirl.define do
  factory :team do
    admin_ids [1]
  end
end
