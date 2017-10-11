# == Schema Information
#
# Table name: analytics
#
#  id           :integer          not null, primary key
#  times_viewed :integer          default(0)
#  opened       :boolean
#  email        :boolean
#  sms          :boolean
#  social       :boolean
#  views        :jsonb
#  shared       :jsonb
#  time_spent   :jsonb
#  project_id   :integer
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#

class Analytic < ApplicationRecord
  belongs_to :project
end
