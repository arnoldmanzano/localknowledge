class ChangeColumnModifiersInRequests < ActiveRecord::Migration
  def change
    change_column :requests, :budget, :text
    add_column :requests, :time_of_day, :string
    remove_column :requests, :languages_spoken
  end

end
