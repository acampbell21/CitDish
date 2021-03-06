class CreateClients < ActiveRecord::Migration[5.1]
  def change
    create_table :clients do |t|
      t.string :name, null: false
      t.string :email
      t.string :phone
      t.string :photo, default: ''
      t.belongs_to :user, foreign_key: true

      t.timestamps
    end
  end
end
