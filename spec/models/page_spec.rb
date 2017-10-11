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

require 'rails_helper'

RSpec.describe Page, type: :model do
  describe 'associations' do
    it { should belong_to(:project) }
  end

  describe 'validations' do
    it { should validate_presence_of(:media_url) }
    it { should validate_presence_of(:recording_url) }
  end
end
