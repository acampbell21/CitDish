class CreateTeams < ActiveRecord::Migration[5.1]
  def change
    create_table :teams do |t|
      t.text :admin_ids

      t.timestamps
    end
  end
end
