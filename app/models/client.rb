class Client < ApplicationRecord
  has_one :address
  validates_presence_of :name, :email, :phone
  belongs_to :user
end
