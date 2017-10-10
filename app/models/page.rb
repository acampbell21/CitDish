class Page < ApplicationRecord
  belongs_to :project
  validates_presence_of :media_url, :recording_url, :analytic_id
end
