require 'rails_helper'

RSpec.describe ReviewsController, type: :controller do

  describe "#create" do

    it "-> creates a new review" do
      user = FactoryGirl.create(:user)
      @_request = FactoryGirl.create(:request)
      @_reply = FactoryGirl.create(:reply)
      sign_in user
      post :create, request_id: @_request.id, reply_id: @_reply.id, review: attributes_for(:review)
      expect(Review.count).to eq(1)
    end
  end

end
