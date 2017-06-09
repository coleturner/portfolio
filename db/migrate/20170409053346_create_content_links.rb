class CreateContentLinks < ActiveRecord::Migration[5.0]
  def change
    create_table :content_links do |t|
      t.references :content, foreign_key: true
      t.references :entity, polymorphic: true
      t.integer :position, index: true

      t.timestamps
    end
  end
end
