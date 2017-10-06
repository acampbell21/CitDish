class Team < ApplicationRecord
  serialize :admin_ids, Array
  has_many :users
end
