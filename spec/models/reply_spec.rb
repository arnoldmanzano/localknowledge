require 'rails_helper'

RSpec.describe Reply, type: :model do
  it { should belong_to :user }
  it { should belong_to :request }
  it { should have_many :pictures }

  describe '#find_user' do

    it 'matches the username with the user id of the user who made the reply' do
      user = create(:user_with_replies)
      reply = create(:reply)
      expect(reply.find_user(reply.user_id)).to eq(user.username)
    end
  end
end
