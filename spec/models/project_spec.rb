# == Schema Information
#
# Table name: projects
#
#  id                        :integer          not null, primary key
#  title                     :string           not null
#  active                    :boolean          default(TRUE)
#  communication_preferences :jsonb
#  user_id                   :integer
#  created_at                :datetime         not null
#  updated_at                :datetime         not null
#  clients                   :jsonb
#

require 'rails_helper'

RSpec.describe Project, type: :model do
  describe 'class methods' do
    it '.active' do
      user = FactoryGirl.create(:user)
      inactive_project = FactoryGirl.create(:project, active: false, user: user)
      active_project = FactoryGirl.create(:project, active: true, user: user)
      active_projects = Project.active
      expect(active_projects.count).to eq(1)
      expect(active_projects.first).to eq(active_project)
    end
  end

  describe 'validations' do
    it { should validate_presence_of(:title) }
  end

  describe 'associations' do
    it { should belong_to(:user) }
    it { should have_one(:analytic) }
  end
end

