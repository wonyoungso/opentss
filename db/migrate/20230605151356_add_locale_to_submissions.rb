class AddLocaleToSubmissions < ActiveRecord::Migration[7.0]
  def change
    add_column :submissions, :locale, :string, :default => "en"
  end
end
