# == Schema Information
#
# Table name: clients
#
#  id         :integer          not null, primary key
#  name       :string           not null
#  email      :string
#  phone      :string
#  photo      :string           default("")
#  user_id    :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  uid        :string           not null
#  from_crm   :boolean          default(TRUE)
#

class Client < ApplicationRecord
  has_one :address
  validates_presence_of :name
  belongs_to :user
end
