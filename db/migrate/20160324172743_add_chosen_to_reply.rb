class AddChosenToReply < ActiveRecord::Migration
  def change
    add_column :replies, :chosen, :boolean, :default => false
  end
end
