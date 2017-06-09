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

ActiveRecord::Schema.define(version: 20170531054845) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "activities", force: :cascade do |t|
    t.integer  "user_id"
    t.string   "verb"
    t.string   "object_type"
    t.string   "object_id"
    t.jsonb    "meta"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.index ["object_id"], name: "index_activities_on_object_id", using: :btree
    t.index ["object_type", "object_id"], name: "object_type_id", using: :btree
    t.index ["object_type", "verb"], name: "object_type_verb", using: :btree
    t.index ["object_type"], name: "index_activities_on_object_type", using: :btree
    t.index ["user_id"], name: "index_activities_on_user_id", using: :btree
    t.index ["verb"], name: "index_activities_on_verb", using: :btree
  end

  create_table "articles", force: :cascade do |t|
    t.string   "title"
    t.string   "slug"
    t.string   "byline"
    t.text     "summary"
    t.integer  "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.json     "image_data"
    t.json     "contents"
    t.index ["user_id"], name: "index_articles_on_user_id", using: :btree
  end

  create_table "brands", force: :cascade do |t|
    t.string   "title"
    t.json     "social"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "button_entries", force: :cascade do |t|
    t.string   "url"
    t.string   "contents"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "categories", force: :cascade do |t|
    t.string   "slug"
    t.string   "title"
    t.json     "image_data"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["slug"], name: "index_categories_on_slug", using: :btree
  end

  create_table "collections", force: :cascade do |t|
    t.string   "title"
    t.string   "text"
    t.string   "image"
    t.jsonb    "meta"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "content_links", force: :cascade do |t|
    t.integer  "content_id"
    t.string   "entity_type"
    t.integer  "entity_id"
    t.integer  "position"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.index ["content_id"], name: "index_content_links_on_content_id", using: :btree
    t.index ["entity_type", "entity_id"], name: "index_content_links_on_entity_type_and_entity_id", using: :btree
    t.index ["position"], name: "index_content_links_on_position", using: :btree
  end

  create_table "contentful_syncs", force: :cascade do |t|
    t.string   "sync_url"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "contentities", force: :cascade do |t|
    t.string   "content_id"
    t.string   "content_type"
    t.json     "fields"
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
  end

  create_table "contents", force: :cascade do |t|
    t.string   "object_type"
    t.integer  "object_id"
    t.integer  "status"
    t.json     "meta"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.index ["object_type", "object_id"], name: "index_contents_on_object_type_and_object_id", using: :btree
    t.index ["status"], name: "index_contents_on_status", using: :btree
  end

  create_table "events", force: :cascade do |t|
    t.string  "object_type"
    t.integer "object_id"
    t.string  "type"
    t.integer "value"
    t.date    "created_at"
    t.index ["object_type", "object_id", "type"], name: "index_events_on_object_type_and_object_id_and_type", using: :btree
    t.index ["object_type", "object_id"], name: "index_events_on_object_type_and_object_id", using: :btree
    t.index ["type"], name: "index_events_on_type", using: :btree
  end

  create_table "fae_changes", force: :cascade do |t|
    t.integer  "changeable_id"
    t.string   "changeable_type"
    t.integer  "user_id"
    t.string   "change_type"
    t.text     "updated_attributes"
    t.datetime "created_at",         null: false
    t.datetime "updated_at",         null: false
    t.index ["changeable_id"], name: "index_fae_changes_on_changeable_id", using: :btree
    t.index ["changeable_type"], name: "index_fae_changes_on_changeable_type", using: :btree
    t.index ["user_id"], name: "index_fae_changes_on_user_id", using: :btree
  end

  create_table "fae_files", force: :cascade do |t|
    t.string   "name"
    t.string   "asset"
    t.string   "fileable_type"
    t.integer  "fileable_id"
    t.integer  "file_size"
    t.integer  "position",      default: 0
    t.string   "attached_as"
    t.boolean  "on_stage",      default: true
    t.boolean  "on_prod",       default: false
    t.boolean  "required",      default: false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.index ["attached_as"], name: "index_fae_files_on_attached_as", using: :btree
    t.index ["fileable_type", "fileable_id"], name: "index_fae_files_on_fileable_type_and_fileable_id", using: :btree
  end

  create_table "fae_images", force: :cascade do |t|
    t.string   "name"
    t.string   "asset"
    t.string   "imageable_type"
    t.integer  "imageable_id"
    t.string   "alt"
    t.string   "caption"
    t.integer  "position",       default: 0
    t.string   "attached_as"
    t.boolean  "on_stage",       default: true
    t.boolean  "on_prod",        default: false
    t.integer  "file_size"
    t.boolean  "required",       default: false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.index ["attached_as"], name: "index_fae_images_on_attached_as", using: :btree
    t.index ["imageable_type", "imageable_id"], name: "index_fae_images_on_imageable_type_and_imageable_id", using: :btree
  end

  create_table "fae_options", force: :cascade do |t|
    t.string   "title"
    t.string   "time_zone"
    t.string   "colorway"
    t.string   "stage_url"
    t.string   "live_url"
    t.integer  "singleton_guard"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.index ["singleton_guard"], name: "index_fae_options_on_singleton_guard", unique: true, using: :btree
  end

  create_table "fae_roles", force: :cascade do |t|
    t.string   "name"
    t.integer  "position"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "fae_static_pages", force: :cascade do |t|
    t.string   "title"
    t.integer  "position",   default: 0
    t.boolean  "on_stage",   default: true
    t.boolean  "on_prod",    default: false
    t.string   "slug"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.index ["slug"], name: "index_fae_static_pages_on_slug", using: :btree
  end

  create_table "fae_text_areas", force: :cascade do |t|
    t.string   "label"
    t.text     "content"
    t.integer  "position",         default: 0
    t.boolean  "on_stage",         default: true
    t.boolean  "on_prod",          default: false
    t.integer  "contentable_id"
    t.string   "contentable_type"
    t.string   "attached_as"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.index ["attached_as"], name: "index_fae_text_areas_on_attached_as", using: :btree
    t.index ["contentable_id"], name: "index_fae_text_areas_on_contentable_id", using: :btree
    t.index ["contentable_type"], name: "index_fae_text_areas_on_contentable_type", using: :btree
    t.index ["on_prod"], name: "index_fae_text_areas_on_on_prod", using: :btree
    t.index ["on_stage"], name: "index_fae_text_areas_on_on_stage", using: :btree
    t.index ["position"], name: "index_fae_text_areas_on_position", using: :btree
  end

  create_table "fae_text_fields", force: :cascade do |t|
    t.string   "contentable_type"
    t.integer  "contentable_id"
    t.string   "attached_as"
    t.string   "label"
    t.string   "content"
    t.integer  "position",         default: 0
    t.boolean  "on_stage",         default: true
    t.boolean  "on_prod",          default: false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.index ["attached_as"], name: "index_fae_text_fields_on_attached_as", using: :btree
    t.index ["contentable_type", "contentable_id"], name: "index_fae_text_fields_on_contentable_type_and_contentable_id", using: :btree
    t.index ["on_prod"], name: "index_fae_text_fields_on_on_prod", using: :btree
    t.index ["on_stage"], name: "index_fae_text_fields_on_on_stage", using: :btree
    t.index ["position"], name: "index_fae_text_fields_on_position", using: :btree
  end

  create_table "fae_users", force: :cascade do |t|
    t.string   "email",                  default: "", null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.string   "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string   "unconfirmed_email"
    t.integer  "failed_attempts",        default: 0,  null: false
    t.string   "unlock_token"
    t.datetime "locked_at"
    t.string   "first_name"
    t.string   "last_name"
    t.integer  "role_id"
    t.boolean  "active"
    t.string   "language"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.index ["confirmation_token"], name: "index_fae_users_on_confirmation_token", unique: true, using: :btree
    t.index ["email"], name: "index_fae_users_on_email", unique: true, using: :btree
    t.index ["reset_password_token"], name: "index_fae_users_on_reset_password_token", unique: true, using: :btree
    t.index ["role_id"], name: "index_fae_users_on_role_id", using: :btree
    t.index ["unlock_token"], name: "index_fae_users_on_unlock_token", unique: true, using: :btree
  end

  create_table "feed_activities", force: :cascade do |t|
    t.integer  "feed_id"
    t.integer  "activity_id"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.index ["activity_id"], name: "index_feed_activities_on_activity_id", using: :btree
    t.index ["feed_id", "activity_id"], name: "feed_activity", using: :btree
    t.index ["feed_id"], name: "index_feed_activities_on_feed_id", using: :btree
  end

  create_table "feed_observations", force: :cascade do |t|
    t.integer  "publisher_id"
    t.integer  "subscriber_id"
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
    t.index ["publisher_id"], name: "index_feed_observations_on_publisher_id", using: :btree
    t.index ["subscriber_id"], name: "index_feed_observations_on_subscriber_id", using: :btree
  end

  create_table "feeds", force: :cascade do |t|
    t.string   "slug"
    t.integer  "format",     default: 0
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
    t.index ["slug"], name: "index_feeds_on_slug", using: :btree
  end

  create_table "friendly_id_slugs", force: :cascade do |t|
    t.string   "slug",                      null: false
    t.integer  "sluggable_id",              null: false
    t.string   "sluggable_type", limit: 50
    t.string   "scope"
    t.datetime "created_at"
    t.index ["slug", "sluggable_type", "scope"], name: "index_friendly_id_slugs_on_slug_and_sluggable_type_and_scope", unique: true, using: :btree
    t.index ["slug", "sluggable_type"], name: "index_friendly_id_slugs_on_slug_and_sluggable_type", using: :btree
    t.index ["sluggable_id"], name: "index_friendly_id_slugs_on_sluggable_id", using: :btree
    t.index ["sluggable_type"], name: "index_friendly_id_slugs_on_sluggable_type", using: :btree
  end

  create_table "image_links", force: :cascade do |t|
    t.string   "object_type"
    t.integer  "object_id"
    t.integer  "image_id"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.index ["image_id"], name: "index_image_links_on_image_id", using: :btree
    t.index ["object_type", "object_id"], name: "index_image_links_on_object_type_and_object_id", using: :btree
  end

  create_table "images", force: :cascade do |t|
    t.string   "object_type"
    t.integer  "object_id"
    t.json     "file_data"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.string   "alt"
    t.index ["object_type", "object_id"], name: "index_images_on_object_type_and_object_id", using: :btree
  end

  create_table "post_categories", force: :cascade do |t|
    t.string   "name"
    t.integer  "position"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "posts", force: :cascade do |t|
    t.string   "title"
    t.string   "slug"
    t.text     "introduction"
    t.text     "body"
    t.date     "date"
    t.integer  "post_category_id"
    t.datetime "created_at",       null: false
    t.datetime "updated_at",       null: false
    t.index ["post_category_id"], name: "index_posts_on_post_category_id", using: :btree
  end

  create_table "product_attribute_groups", force: :cascade do |t|
    t.string   "name"
    t.json     "units"
    t.string   "prefix"
    t.string   "suffix"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "product_attributes", force: :cascade do |t|
    t.integer  "product_attribute_group_id"
    t.integer  "product_id"
    t.integer  "numerary"
    t.string   "text"
    t.string   "unit"
    t.datetime "created_at",                 null: false
    t.datetime "updated_at",                 null: false
    t.index ["product_attribute_group_id"], name: "index_product_attributes_on_product_attribute_group_id", using: :btree
    t.index ["product_id"], name: "index_product_attributes_on_product_id", using: :btree
  end

  create_table "product_category_attributes", force: :cascade do |t|
    t.integer  "product_attribute_group_id"
    t.integer  "category_id"
    t.datetime "created_at",                 null: false
    t.datetime "updated_at",                 null: false
    t.index ["category_id"], name: "index_product_category_attributes_on_category_id", using: :btree
    t.index ["product_attribute_group_id"], name: "index_product_category_attributes_on_product_attribute_group_id", using: :btree
  end

  create_table "product_links", force: :cascade do |t|
    t.string   "url"
    t.boolean  "is_featured"
    t.boolean  "is_sponsored"
    t.decimal  "price",        precision: 8, scale: 2
    t.integer  "product_id"
    t.integer  "shop_id"
    t.datetime "created_at",                           null: false
    t.datetime "updated_at",                           null: false
    t.index ["product_id"], name: "index_product_links_on_product_id", using: :btree
    t.index ["shop_id"], name: "index_product_links_on_shop_id", using: :btree
  end

  create_table "product_tag_traits", force: :cascade do |t|
    t.integer  "product_trait_group_id"
    t.integer  "tag_id"
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
    t.index ["product_trait_group_id"], name: "index_product_tag_traits_on_product_trait_group_id", using: :btree
    t.index ["tag_id"], name: "index_product_tag_traits_on_tag_id", using: :btree
  end

  create_table "product_trait_groups", force: :cascade do |t|
    t.string   "name"
    t.json     "units"
    t.string   "prefix"
    t.string   "suffix"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "product_traits", force: :cascade do |t|
    t.integer  "product_trait_group_id"
    t.integer  "product_id"
    t.integer  "numerary"
    t.string   "text"
    t.string   "unit"
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
    t.index ["product_id"], name: "index_product_traits_on_product_id", using: :btree
    t.index ["product_trait_group_id"], name: "index_product_traits_on_product_trait_group_id", using: :btree
  end

  create_table "products", force: :cascade do |t|
    t.string   "slug"
    t.string   "title"
    t.string   "summary"
    t.text     "text"
    t.integer  "score"
    t.json     "images"
    t.integer  "brand_id"
    t.integer  "category_id"
    t.decimal  "rating",        precision: 3, scale: 2, default: "0.0"
    t.integer  "reviews_count",                         default: 0
    t.datetime "created_at",                                            null: false
    t.datetime "updated_at",                                            null: false
    t.index ["brand_id"], name: "index_products_on_brand_id", using: :btree
    t.index ["category_id"], name: "index_products_on_category_id", using: :btree
    t.index ["score"], name: "index_products_on_score", using: :btree
  end

  create_table "reaction_groups", force: :cascade do |t|
    t.string   "object_type"
    t.integer  "object_id"
    t.string   "value"
    t.integer  "reactions_count", default: 0
    t.datetime "created_at",                  null: false
    t.datetime "updated_at",                  null: false
    t.index ["object_type", "object_id"], name: "index_reaction_groups_on_object_type_and_object_id", using: :btree
  end

  create_table "reactions", force: :cascade do |t|
    t.integer  "reaction_group_id"
    t.integer  "user_id"
    t.datetime "created_at",        null: false
    t.datetime "updated_at",        null: false
    t.index ["reaction_group_id"], name: "index_reactions_on_reaction_group_id", using: :btree
    t.index ["user_id"], name: "index_reactions_on_user_id", using: :btree
  end

  create_table "reviews", force: :cascade do |t|
    t.integer  "product_id"
    t.integer  "user_id"
    t.integer  "rating"
    t.text     "text"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["product_id"], name: "index_reviews_on_product_id", using: :btree
    t.index ["user_id"], name: "index_reviews_on_user_id", using: :btree
  end

  create_table "shops", force: :cascade do |t|
    t.boolean  "is_featured"
    t.string   "title"
    t.string   "url"
    t.json     "social"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  create_table "tag_links", force: :cascade do |t|
    t.integer  "tag_id"
    t.string   "taggable_type"
    t.integer  "taggable_id"
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
    t.index ["tag_id"], name: "index_tag_links_on_tag_id", using: :btree
    t.index ["taggable_type", "taggable_id"], name: "index_tag_links_on_taggable_type_and_taggable_id", using: :btree
  end

  create_table "tags", force: :cascade do |t|
    t.string   "name"
    t.string   "display_name"
    t.text     "description"
    t.integer  "parent_id"
    t.datetime "created_at",                   null: false
    t.datetime "updated_at",                   null: false
    t.json     "image_data"
    t.integer  "tag_count"
    t.string   "slug"
    t.boolean  "is_category",  default: false
    t.index ["parent_id"], name: "index_tags_on_parent_id", using: :btree
  end

  create_table "text_entries", force: :cascade do |t|
    t.text     "contents"
    t.string   "title"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string   "name"
    t.string   "byline"
    t.string   "headline"
    t.json     "avatar_data"
    t.integer  "reviews_count",          default: 0
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
    t.string   "slug"
    t.index ["email"], name: "index_users_on_email", unique: true, using: :btree
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree
    t.index ["slug"], name: "index_users_on_slug", unique: true, using: :btree
  end

  create_table "versions", force: :cascade do |t|
    t.string   "item_type",      null: false
    t.integer  "item_id",        null: false
    t.string   "event",          null: false
    t.string   "whodunnit"
    t.json     "object"
    t.json     "object_changes"
    t.datetime "created_at"
    t.index ["item_type", "item_id"], name: "index_versions_on_item_type_and_item_id", using: :btree
  end

  add_foreign_key "activities", "users"
  add_foreign_key "articles", "users"
  add_foreign_key "content_links", "contents"
  add_foreign_key "feed_activities", "activities"
  add_foreign_key "feed_activities", "feeds"
  add_foreign_key "feed_observations", "feeds", column: "publisher_id"
  add_foreign_key "feed_observations", "feeds", column: "subscriber_id"
  add_foreign_key "image_links", "images"
  add_foreign_key "posts", "post_categories"
  add_foreign_key "product_attributes", "product_attribute_groups"
  add_foreign_key "product_attributes", "products"
  add_foreign_key "product_category_attributes", "categories"
  add_foreign_key "product_category_attributes", "product_attribute_groups"
  add_foreign_key "product_links", "products"
  add_foreign_key "product_links", "shops"
  add_foreign_key "product_tag_traits", "product_trait_groups"
  add_foreign_key "product_tag_traits", "tags"
  add_foreign_key "product_traits", "product_trait_groups"
  add_foreign_key "product_traits", "products"
  add_foreign_key "products", "brands"
  add_foreign_key "products", "categories"
  add_foreign_key "reactions", "reaction_groups"
  add_foreign_key "reactions", "users"
  add_foreign_key "reviews", "products"
  add_foreign_key "reviews", "users"
  add_foreign_key "tag_links", "tags"
end
