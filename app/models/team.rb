# == Schema Information
#
# Table name: teams
#
#  id         :integer          not null, primary key
#  admin_ids  :text
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Team < ApplicationRecord
  serialize :admin_ids, Array
  has_many :users
end
