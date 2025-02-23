# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2023_11_06_141258) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "action_text_rich_texts", force: :cascade do |t|
    t.string "name", null: false
    t.text "body"
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["record_type", "record_id", "name"], name: "index_action_text_rich_texts_uniqueness", unique: true
  end

  create_table "active_storage_attachments", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.string "service_name", null: false
    t.bigint "byte_size", null: false
    t.string "checksum"
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "active_storage_variant_records", force: :cascade do |t|
    t.bigint "blob_id", null: false
    t.string "variation_digest", null: false
    t.index ["blob_id", "variation_digest"], name: "index_active_storage_variant_records_uniqueness", unique: true
  end

  create_table "companies", force: :cascade do |t|
    t.string "name"
    t.string "url"
    t.boolean "is_accept_letter"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "request_copy_url"
    t.json "form_json"
    t.text "data_collection"
    t.text "scoring_system"
    t.integer "outsourcing_company_id"
    t.boolean "is_sample_report_avail", default: false
    t.boolean "is_admin_interface_available", default: false
    t.json "eviction_data_fields"
    t.json "criminal_data_fields"
    t.json "fees"
    t.string "aka"
    t.string "company_address"
    t.string "company_city"
    t.string "company_state"
    t.string "company_zip_code"
    t.boolean "custom_letter_required", default: false
    t.string "company_mail_name"
    t.json "detail_config"
    t.string "company_type", default: "nationwide specialty CRA"
  end

  create_table "companies_descriptions", force: :cascade do |t|
    t.integer "company_id"
    t.integer "description_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "descriptions", force: :cascade do |t|
    t.string "title"
    t.string "desc_type"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "subtitle"
  end

  create_table "outsourcings", force: :cascade do |t|
    t.integer "company_id"
    t.integer "outsourcing_company_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "publish_configurations", force: :cascade do |t|
    t.boolean "publish_survey"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "report_statistics", force: :cascade do |t|
    t.integer "company_id"
    t.integer "total"
    t.integer "accepted_cnt"
    t.integer "denied_cnt"
    t.float "avg_security_deposit"
    t.json "credit_score_dist"
    t.json "rti_dist"
    t.json "monthly_debt_dist"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.json "housing_type"
    t.json "dti_dist"
    t.boolean "public", default: false
  end

  create_table "submissions", force: :cascade do |t|
    t.boolean "consented"
    t.datetime "consented_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.text "printed_name"
    t.text "gender"
    t.text "is_hispanic_or_latino"
    t.text "race"
    t.text "age"
    t.text "partner"
    t.text "dependents"
    t.text "income"
    t.text "accepted"
    t.text "security_deposit"
    t.text "rent"
    t.text "bedrooms"
    t.text "house_type"
    t.text "voucher"
    t.text "minimum_rent"
    t.text "landlord_name"
    t.text "property_address"
    t.text "property_address_city"
    t.text "property_address_state"
    t.text "experience_freeform"
    t.text "interview_possible"
    t.text "email"
    t.text "property_address_zipcode"
    t.string "confirmation_token"
    t.datetime "confirmation_sent_at"
    t.boolean "confirmed", default: false
    t.datetime "confirmed_at"
    t.string "retrieve_token"
    t.datetime "retrieve_sent_at"
    t.string "status", default: "submitted"
    t.integer "company_id"
    t.text "transgender"
    t.text "landlord_scale"
    t.text "report_date_month"
    t.text "report_date_year"
    t.text "rent_apply_date_month"
    t.text "rent_apply_date_year"
    t.datetime "reward_granted_at"
    t.json "reward_tremendous_json"
    t.json "order_tremendous_json"
    t.string "locale", default: "en"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "superadmin_role"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "active_storage_variant_records", "active_storage_blobs", column: "blob_id"
end
