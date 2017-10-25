class AddPaymentInfoToTeams < ActiveRecord::Migration[5.1]
  def change
    add_column :teams, :payment_user_id, :string
    add_column :teams, :paid, :boolean, deafult: false
    add_column :teams, :trial, :boolean, default: true
  end
end
