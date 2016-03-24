class AddDateToRequest < ActiveRecord::Migration
  def change
    add_column :requests, :request_date, :datetime
  end
end
