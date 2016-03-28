require 'rails_helper'

RSpec.describe RequestsController, type: :controller do
  # 
  # login_admin

  describe "GET #index" do

    it "-> populates an array of requests" do
      request = FactoryGirl.create(:request)
      assigns(:request).should eq(request)
    end
  end

  describe "POST #create" do

    it "-> creates a new request" do
      request = FactoryGirl.create(:request)
      expect{
        post :create, request: FactoryGirl.attributes_for(:request)
      }.to change(Request,:count).by(1)
    end
  end

  describe "PUT #update" do

    before :each do
      @myrequest = create(:request, location: "Here", description: "There", request_date: "23/6/2016")
    end

    it "-> locates the specified request" do
      put :update, id: @myrequest, request: FactoryGirl.attributes_for(:request)
      assigns(:request).should eq(@myrequest)
    end

    it "-> changes request attributes" do
      put :update, id: @myrequest,
        request: FactoryGirl.attributes_for(:request, location: "Here", description: "There", request_date: "23/6/2016")
      @myrequest.reload
      @myrequest.location.should eq("Here")
      @myrequest.description.should eq("There")
    end
  end

  describe 'DELETE #destroy' do
    before :each do
      @thisrequest = create(:request)
    end

    it "-> deletes the request" do
      expect{
        delete :destroy, id: @thisrequest
      }.to change(Request,:count).by(-1)
    end

    it "-> redirects to contacts#index" do
      delete :destroy, id: @thisrequest
      response.should redirect_to requests_path
    end
  end

end
