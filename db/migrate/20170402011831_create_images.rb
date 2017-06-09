class CreateImages < ActiveRecord::Migration[5.0]
  def change
    create_table :images do |t|
      t.references :object, polymorphic: true
      t.json :file_data
      t.string :alt

      t.timestamps
    end
  end
end
