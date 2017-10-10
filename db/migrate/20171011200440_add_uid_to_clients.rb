class AddUidToClients < ActiveRecord::Migration[5.1]
  def change
    add_column :clients, :uid, :string, null: false
    add_column :clients, :from_crm, :boolean, default: true
  end
end
