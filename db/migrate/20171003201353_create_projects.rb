class CreateProjects < ActiveRecord::Migration[5.1]
  def change
    create_table :projects do |t|
      t.string :title, null: false
      t.boolean :active, default: true
      t.jsonb :communication_preferences
      t.belongs_to :user, foreign_key: true

      t.timestamps
    end
  end
end
