require 'rails_helper'

RSpec.describe RepliesController, type: :controller do
  # login_admin

  describe "POST #create" do

    it "-> creates a new reply" do
      reply = FactoryGirl.create(:reply)
      expect{
        post :create, reply: FactoryGirl.attributes_for(:reply)
      }.to change(Reply,:count).by(1)
    end
  end

  describe "POST #choose" do

    before :each do
      @myreply = FactoryGirl.create(:reply)
    end

    it '-> redirects back to requests after successfully choosing' do
      post :choose, id: @myreply
      response.should redirect_to requests_path
    end
  end

  describe "PUT #update" do

    before :each do
      @thisreply = create(:reply)
    end

    it "-> locates the specified reply" do
      put :update, id: @thisreply, reply: FactoryGirl.attributes_for(:reply)
      assigns(:reply).should eq(@thisreply)
    end

    it "-> changes reply attributes" do
      put :update, id: @thisreply,
        request: FactoryGirl.attributes_for(:reply)
      @thisreply.reload
      @thisreply.meeting_point.should eq("MyString")
      @thisreply.description.should eq("MyText")
    end
  end

  describe 'DELETE #destroy' do
    before :each do
      @a_reply = create(:reply)
    end

    it "-> deletes the reply" do
      expect{
        delete :destroy, id: @a_reply
      }.to change(Request,:count).by(-1)
    end

    it "-> redirects to requests after deletion" do
      delete :destroy, id: @a_reply
      response.should redirect_to requests_path
    end
  end
end
