require 'rails_helper'

RSpec.describe Request, type: :model do
  it { should belong_to :user }
  it { should have_many :replies }

  it '-> requests should not be in the database after 5 days if not replied to' do

  end

  it '-> requests should be in the database after 5 days if replied to' do

  end 
end
