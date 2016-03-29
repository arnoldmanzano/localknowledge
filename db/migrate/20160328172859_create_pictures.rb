class CreatePictures < ActiveRecord::Migration
  def change
    create_table :pictures do |t|
      t.string    :description
      t.string    :image
      t.string    :reply_token
      t.string    :image_file_name
      t.string    :image_content_type
      t.integer   :image_file_size
      t.datetime  :image_updated_at
      t.references :reply, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
