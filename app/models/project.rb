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

class Project < ApplicationRecord
  belongs_to :user
  validates_presence_of :title
  has_many :pages, dependent: :destroy
  has_one :analytic

  def self.active
    where(active: true)
  end
end
