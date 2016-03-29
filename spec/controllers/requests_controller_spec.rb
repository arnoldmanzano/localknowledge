require 'rails_helper'


RSpec.describe RequestsController, type: :controller do
  include Devise::TestHelpers

  render_views

  before :each do
    _user = FactoryGirl.create(:user)
    sign_in _user
    @thisrequest = create(:request, user: _user)
  end

  describe "#index" do

    it "-> populates an array of requests" do
      @myrequest = create(:request, location: "Here", budget: 20, description: "There", request_date: "23/6/2016")
      @requests = Request.where(["expiration > ?", Time.now])
      expect(@requests.length).to eq(2)
    end
  end

  describe  "#create" do

    it "-> creates a new request" do
      expect{
        post :create, request: attributes_for(:request)
      }.to change{Request.count}.by 1
    end
  end

  describe "#update" do
    it "-> changes request attributes" do
      put :update, id: @thisrequest,
        request: FactoryGirl.attributes_for(:request, location: "Here", description: "There", budget: 20, request_date: "23/6/2016")
      @thisrequest.reload
      expect(@thisrequest.location).to eq("Here")
      expect(@thisrequest.description).to eq("There")
    end

    it '-> redirects to requests path after updating' do
      login_user
      put :update, id: @thisrequest
      expect(response).to redirect_to requests_path
    end
  end

  describe '#destroy' do
    it "-> deletes the request" do
      expect { delete :destroy, id: @thisrequest }.to change{Request.count}.by(-1)
    end

    it "-> redirects to requests post-delete" do
      delete :destroy, id: @thisrequest
      expect(response).to redirect_to requests_path
    end
  end
end
