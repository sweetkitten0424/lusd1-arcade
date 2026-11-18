class CreateGames < ActiveRecord::Migration[8.1]
  def change
    create_table :games do |t|
      t.string :title
      t.string :slug
      t.string :file_path
      t.string :system

      t.timestamps
    end
    add_index :games, :slug, unique: true
  end
end
