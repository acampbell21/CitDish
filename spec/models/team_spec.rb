# == Schema Information
#
# Table name: teams
#
#  id              :integer          not null, primary key
#  admin_ids       :text
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  payment_user_id :string
#  paid            :boolean
#  trial           :boolean          default(TRUE)
#

require 'rails_helper'

RSpec.describe Team, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
