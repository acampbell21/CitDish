require 'rails_helper'

RSpec.describe Page, type: :model do
  describe 'associations' do
    it { should belong_to(:project) }

  describe 'validations' do
    it { should validate_presence_of(:media_url, :recording_url, :analytic_id ) }
  end
end
