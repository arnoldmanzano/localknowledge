# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160329000900) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "pictures", force: :cascade do |t|
    t.string   "description"
    t.string   "image"
    t.string   "reply_token"
    t.string   "image_file_name"
    t.string   "image_content_type"
    t.integer  "image_file_size"
    t.datetime "image_updated_at"
    t.integer  "reply_id"
    t.datetime "created_at",         null: false
    t.datetime "updated_at",         null: false
  end

  add_index "pictures", ["reply_id"], name: "index_pictures_on_reply_id", using: :btree

  create_table "replies", force: :cascade do |t|
    t.string   "meeting_point"
    t.integer  "duration"
    t.integer  "cost"
    t.text     "stopoffs"
    t.text     "description"
    t.integer  "request_id"
    t.datetime "created_at",                    null: false
    t.datetime "updated_at",                    null: false
    t.integer  "user_id"
    t.boolean  "chosen",        default: false
  end

  add_index "replies", ["request_id"], name: "index_replies_on_request_id", using: :btree
  add_index "replies", ["user_id"], name: "index_replies_on_user_id", using: :btree

  create_table "requests", force: :cascade do |t|
    t.string   "location"
    t.text     "description"
    t.integer  "user_id"
    t.datetime "created_at",                        null: false
    t.datetime "updated_at",                        null: false
    t.date     "expiration"
    t.text     "budget"
    t.datetime "request_date"
    t.boolean  "resolved",          default: false
    t.string   "lat"
    t.string   "lng"
    t.time     "tour_time_start"
    t.time     "tour_time_end"
    t.decimal  "tour_duration"
    t.integer  "group_size"
    t.string   "time_of_day"
    t.boolean  "luggage"
    t.boolean  "children"
    t.boolean  "airport_access"
    t.boolean  "disability_access"
  end

  add_index "requests", ["user_id"], name: "index_requests_on_user_id", using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "email",                  default: "", null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet     "current_sign_in_ip"
    t.inet     "last_sign_in_ip"
    t.datetime "created_at",                          null: false
    t.datetime "updated_at",                          null: false
    t.string   "avatar_file_name"
    t.string   "avatar_content_type"
    t.integer  "avatar_file_size"
    t.datetime "avatar_updated_at"
    t.string   "f_name"
    t.string   "l_name"
    t.string   "username"
    t.string   "postcode"
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree

  add_foreign_key "pictures", "replies"
  add_foreign_key "replies", "requests"
  add_foreign_key "replies", "users"
  add_foreign_key "requests", "users"
end
