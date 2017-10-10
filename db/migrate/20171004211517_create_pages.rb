class CreatePages < ActiveRecord::Migration[5.1]
  def change
    create_table :pages do |t|
      t.string :media_url, null: false
      t.string :recording_url, default: ''
      t.belongs_to :project, foreign_key: true

      t.timestamps
    end
  end
end
