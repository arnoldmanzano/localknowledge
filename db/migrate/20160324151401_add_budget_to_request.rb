class AddBudgetToRequest < ActiveRecord::Migration
  def change
    add_column :requests, :budget, :integer
  end
end
