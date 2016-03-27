require 'rails_helper'

RSpec.describe Request, type: :model do
  let(:pending_request) {described_class}

  it { should belong_to :user }
  it { should have_many(:replies).dependent(:destroy) }

  it { is_expected.to respond_to(:set_expiration_date, :build_reply) }


  describe '#set_expiration_date' do

    it 'sets the expiration date for unreplied requests to 5 days' do
      expires_on = Date.today + 5
      a_request = pending_request.create(id: 1, location: "Peckham", user_id: 2)
      a_request.set_expiration_date
      expect(a_request.expiration).to eq(expires_on)
    end

    it 'sets the expiration date for replied requests to 1000 days' do
      expires_on = Date.today + 1000
      request = build(:request)
      request.build_reply(create(:user_with_requests))
      request.save
      expect(request.expiration).to eq(expires_on)
    end

  end

  describe '#build_reply' do

    it 'creates a reply' do
      request = build(:request)
      user = create(:user_with_requests)
      expect(request.build_reply(user)).to eq(request.replies[0])
    end

    it 'associates this reply with a user' do
      request = build(:request)
      user = create(:user_with_requests)
      reply = request.build_reply(user)
      expect(user.id).to eq(reply.user_id)
    end



  end
end
