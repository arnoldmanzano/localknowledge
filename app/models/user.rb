class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  has_many :requests, dependent: :destroy
  has_many :replies, dependent: :destroy
  has_many :reviews, dependent: :destroy
  has_many :replied_requests, through: :replies, source: :request
  has_many :reviewed_replies, through: :reviews, source: :replies

  validates :f_name, :l_name, :username, presence: true

  has_attached_file :avatar, :styles => { :medium => "300x300>", :thumb => "100x100#" }, :default_url => "/images/:style/missing.png"
  validates_attachment_content_type :avatar, :content_type => /\Aimage\/.*\Z/

  def avatar_url
    avatar.url(:thumb)
  end

end
