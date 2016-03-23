require 'rails_helper'

RSpec.describe Reply, type: :model do
  it { should belong_to :user }
  it { should belong_to :request }
end
