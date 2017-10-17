# == Schema Information
#
# Table name: pages
#
#  id            :integer          not null, primary key
#  media_url     :string           not null
#  recording_url :string           default("")
#  project_id    :integer
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#

class Page < ApplicationRecord
  belongs_to :project
  validates_presence_of :media_url
end
