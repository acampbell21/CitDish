class Client < ApplicationRecord
  has_one :address
  validates_presence_of :name
  belongs_to :user
end
