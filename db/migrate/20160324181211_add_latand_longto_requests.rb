class AddLatandLongtoRequests < ActiveRecord::Migration
  def change
    add_column :requests, :lat, :string
    add_column :requests, :lng, :string
  end
end
