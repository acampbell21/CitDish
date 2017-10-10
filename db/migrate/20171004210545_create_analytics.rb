class CreateAnalytics < ActiveRecord::Migration[5.1]
  def change
    create_table :analytics do |t|
      t.integer :times_viewed, default: 0
      t.boolean :opened
      t.boolean :email
      t.boolean :sms
      t.boolean :social
      t.jsonb :views
      t.jsonb :shared
      t.jsonb :time_spent
      t.belongs_to :project, foreign_key: true

      t.timestamps
    end
  end
end
