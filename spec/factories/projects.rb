# == Schema Information
#
# Table name: projects
#
#  id                        :integer          not null, primary key
#  title                     :string           not null
#  active                    :boolean          default(TRUE)
#  communication_preferences :jsonb
#  user_id                   :integer
#  created_at                :datetime         not null
#  updated_at                :datetime         not null
#  clients                   :jsonb
#

FactoryGirl.define do
  factory :project do
    title "Test Project"
    active true
    user
  end
end
