class Address < ApplicationRecord
  belongs_to :client
  validates_presence_of :street, :city, :state, :zip
end
