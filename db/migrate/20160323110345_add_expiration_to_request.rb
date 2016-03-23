class AddExpirationToRequest < ActiveRecord::Migration
  def change
    add_column :requests, :expiration, :date
  end
end
