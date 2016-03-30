class AddTourTimesToRequests < ActiveRecord::Migration
  def change
    add_column :requests, :tour_time_start, :time
    add_column :requests, :tour_time_end, :time
    add_column :requests, :tour_duration, :decimal
    add_column :requests, :group_size, :integer
    add_column :requests, :special_considerations, :string, array: true, default: []
    add_column :requests, :languages_spoken, :string, array: true, default: []
  end
end
