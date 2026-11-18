class Game < ApplicationRecord
  has_many :scores, dependent: :destroy

  validates :title, presence: true
  validates :slug, presence: true, uniqueness: true
  validates :file_path, presence: true
end

