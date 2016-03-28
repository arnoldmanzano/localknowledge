require 'rails_helper'


RSpec.describe RequestsController, type: :controller do
  include Devise::TestHelpers

  render_views

  describe "#index" do

    it "-> populates an array of requests" do
      @myrequest = create(:request, location: "Here", budget: 20, description: "There", request_date: "23/6/2016")
      @requests = Request.where(["expiration > ?", Time.now])
      expect(@requests.length).to eq(1)
    end
  end

  describe  "#create" do

    it "-> creates a new request" do
      login_user
      post :create, request: attributes_for(:request)
      expect(Request.count).to eq(1)
    end
  end

  describe "#update" do

    before :each do
      @myrequest = create(:request, location: "Here", budget: 20, description: "There", request_date: "23/6/2016")
    end

    it "-> changes request attributes" do
      put :update, id: @myrequest,
        request: FactoryGirl.attributes_for(:request, location: "Here", description: "There", budget: 20, request_date: "23/6/2016")
      @myrequest.reload
      @myrequest.location.should eq("Here")
      @myrequest.description.should eq("There")
    end

    it 'redirects to requests path after updating' do
      login_user
      put :update, id: @myrequest
      response.should redirect_to requests_path
    end
  end

  describe '#destroy' do

    before :each do
      login_user
      @thisrequest = create(:request)
    end

    it "-> deletes the request" do
      expect { delete request_path(@thisrequest) }.not_to change(Request, :count)
    end

    it "-> redirects to requests post-delete" do
      delete :destroy, id: @thisrequest
      response.should redirect_to requests_path
    end
  end
end
