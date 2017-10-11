class AddCompanyImageToUser < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :company_image, :string
  end
end
