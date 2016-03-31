require 'rails_helper'

RSpec.describe RepliesController, type: :controller do

  include Devise::TestHelpers
  include SmsSpec::Helpers
  include SmsSpec::Matchers

  before(:each) do
    @_user = FactoryGirl.create(:user)
    @_request = FactoryGirl.create(:request)
    sign_in @_user
  end

  let(:phone_number) {"+447791621716"}

  describe "#create" do

    it "-> creates a new reply" do
      post :create, request_id: @_request.id, reply: attributes_for(:reply)
      expect(Reply.count).to eq(1)
    end

    it "sends a text message to the phone number of user that made the request" do
      post 'create', request_id: @_request.id, user_id: @_user.id, reply: attributes_for(:reply)
      open_last_text_message_for phone_number
      expect(current_text_message).to have_body "Your request has been replied to, please visit LocalHost.com"
    end
  end

  describe "#choose" do

    it '-> redirects back to requests after successfully choosing' do
      @myreply = FactoryGirl.create(:reply)
      post :choose, request_id: @_request.id, id: @myreply
      expect(response).to redirect_to requests_path
    end

    it "sends a text message to the phone number of user whose reply has been chosen" do
      @myreply = FactoryGirl.create(:reply)
      post :choose, request_id: @_request.id, user_id: @_user.id, id: @myreply
      2.times {open_last_text_message_for phone_number}
      expect(current_text_message).to have_body "A user has accepted your tour request, please go online to check details."
    end
  end

  describe "#update" do

    before :each do
      @thisreply = FactoryGirl.create(:reply)
    end

    it "-> changes reply attributes" do
      put :update, request_id: @_request.id, id: @thisreply,
        reply: FactoryGirl.attributes_for(:reply)
      @thisreply.reload
      expect(@thisreply.meeting_point).to eq("MyString")
      expect(@thisreply.description).to eq("MyText")
    end

    it '-> redirects to requests path after updating reply' do
      login_user
      put :update, request_id: @_request.id, id: @thisreply
      expect(response).to redirect_to requests_path
    end
  end

  describe '#destroy' do

    before :each do
      _user2 = FactoryGirl.create(:user)
      sign_in _user2
      @thisreply = FactoryGirl.create(:reply, request: @_request, user_id: _user2.id)
    end

    it "-> deletes the reply" do
      expect{
        delete :destroy, request_id: @_request.id, id: @thisreply
      }.to change{Reply.count}.by(-1)
    end

    it "-> redirects to requests after deletion" do
      delete :destroy, request_id: @_request.id, id: @thisreply
      expect(response).to redirect_to requests_path
    end
  end
end
