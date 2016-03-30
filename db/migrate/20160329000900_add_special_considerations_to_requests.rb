class AddSpecialConsiderationsToRequests < ActiveRecord::Migration
  def change
    add_column :requests, :luggage, :boolean
    add_column :requests, :children, :boolean
    add_column :requests, :airport_access, :boolean
    add_column :requests, :disability_access, :boolean
  end
end
