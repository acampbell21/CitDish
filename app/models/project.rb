class Project < ApplicationRecord
  belongs_to :user
  validates_presence_of :title

  def self.active
    where(active: true)
  end
end
