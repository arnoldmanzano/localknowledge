class CreateReplies < ActiveRecord::Migration
  def change
    create_table :replies do |t|
      t.string :meeting_point
      t.integer :duration
      t.integer :cost
      t.text :stopoffs
      t.text :description
      t.references :request, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
