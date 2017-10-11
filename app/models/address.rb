# == Schema Information
#
# Table name: addresses
#
#  id         :integer          not null, primary key
#  street     :string           not null
#  city       :string           not null
#  state      :string           not null
#  zip        :string           not null
#  client_id  :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Address < ApplicationRecord
  belongs_to :client
  validates_presence_of :street, :city, :state, :zip
end
