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
#

class Project < ApplicationRecord
  belongs_to :user
  validates_presence_of :title

  def self.active
    where(active: true)
  end
end
