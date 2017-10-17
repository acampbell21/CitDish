class ModifyContactFields < ActiveRecord::Migration[5.1]
  def change
    add_column :clients, :mobile_phone, :string
    add_column :clients, :mailing_address, :jsonb
    add_column :clients, :home_phone, :string
    add_column :clients, :title, :string
    add_column :clients, :notes, :jsonb

    remove_column :clients, :photo, :string
  end
end
