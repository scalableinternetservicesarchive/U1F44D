class AddPaperclipUploadedImage < ActiveRecord::Migration
  def self.up
    remove_column :images, :url if Image.column_names.include?( 'url' )
    add_attachment :images, :img
  end

  def self.down
    add_column :images, :url, :string
    remove_attachment :images, :img
  end
end
