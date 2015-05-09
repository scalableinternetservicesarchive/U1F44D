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

ActiveRecord::Schema.define(version: 20150509223803) do

  create_table "comments", force: :cascade do |t|
    t.integer  "image_id",   limit: 4
    t.integer  "user_id",    limit: 4
    t.text     "text",       limit: 65535
    t.datetime "created_at",               null: false
    t.datetime "updated_at",               null: false
  end

  add_index "comments", ["image_id"], name: "index_comments_on_image_id", using: :btree
  add_index "comments", ["user_id"], name: "index_comments_on_user_id", using: :btree

  create_table "images", force: :cascade do |t|
    t.integer  "score",            limit: 4
    t.float    "location_lat",     limit: 24
    t.float    "location_long",    limit: 24
    t.string   "author",           limit: 255
    t.datetime "created_at",                   null: false
    t.datetime "updated_at",                   null: false
    t.string   "img_file_name",    limit: 255
    t.string   "img_content_type", limit: 255
    t.integer  "img_file_size",    limit: 4
    t.datetime "img_updated_at"
  end

  create_table "posts", force: :cascade do |t|
    t.string   "image_url",  limit: 255
    t.integer  "user_id",    limit: 4
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
  end

  create_table "users", force: :cascade do |t|
    t.string   "sid",        limit: 255,             null: false
    t.integer  "karma",      limit: 4,   default: 0, null: false
    t.datetime "created_at",                         null: false
    t.datetime "updated_at",                         null: false
  end

  add_index "users", ["sid"], name: "index_users_on_sid", unique: true, using: :btree

  create_table "votes", id: false, force: :cascade do |t|
    t.integer "user_id",  limit: 4, null: false
    t.integer "image_id", limit: 4, null: false
    t.boolean "upvote",   limit: 1
  end

  add_index "votes", ["image_id", "user_id"], name: "index_votes_on_image_id_and_user_id", unique: true, using: :btree

  add_foreign_key "comments", "images"
  add_foreign_key "comments", "users"
end
