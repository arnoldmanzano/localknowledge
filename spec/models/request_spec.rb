require 'rails_helper'

RSpec.describe Request, type: :model do
  let(:pending_request) {described_class}
  let(:dummy_reply) {double :dummy_reply}

  it { should belong_to :user }
  it { should have_many(:replies).dependent(:destroy) }


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
      request.build_reply(attributes_for(:reply), create(:user_with_requests))
      request.save
      expect(request.expiration).to eq(expires_on)
    end

  end
end
