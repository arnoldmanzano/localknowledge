require 'rails_helper'


RSpec.describe User, type: :model do

  it { should have_many(:requests).dependent(:destroy) }
  it { should have_many(:replies).dependent(:destroy) }
  it { should have_many :replied_requests }

  it "-> is valid with a firstname, lastname, username and email" do
    user = User.new(
         f_name: 'bob',
         l_name: 'obo',
         username: 'bobo',
         email: 'tester@example.com',
         password: 'password')
    expect(user).to be_valid
  end

  it "-> is invalid without a firstname" do
    user = User.new(f_name: nil)
    user.valid?
    expect(user.errors[:f_name]).to include("can't be blank")
  end

  it "-> is invalid without a lastname" do
    user = User.new(l_name: nil)
    user.valid?
    expect(user.errors[:l_name]).to include("can't be blank")
  end

  it "-> is invalid without a username" do
    user = User.new(username: nil)
    user.valid?
    expect(user.errors[:username]).to include("can't be blank")
  end

  it "-> is invalid without an email" do
    user = User.new(email: nil)
    user.valid?
    expect(user.errors[:email]).to include("can't be blank")
  end

end
