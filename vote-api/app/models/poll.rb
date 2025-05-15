class Poll < ApplicationRecord
  has_many :votes, dependent: :destroy

  validates :title, presence: true
  validates :options, presence: true
  validate :minimum_two_options

  private

  def minimum_two_options
    if options.is_a?(Array) && options.reject(&:blank?).size < 2
      errors.add(:options, 'має бути щонайменше 2 варіанти')
    end
  end
end
