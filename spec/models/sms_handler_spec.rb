require 'rails_helper'

RSpec.describe SmsHandler do

  include SmsSpec::Helpers
  include SmsSpec::Matchers

  let(:phone_number) {"+447791621716"}
  subject(:smshandler) {described_class.new}

  it '-> sends request owner a text if his request has been replied to' do
    user = FactoryGirl.create(:user)
    smshandler.send_you_have_reply(user)
    open_last_text_message_for phone_number
    expect(current_text_message).to have_body "Your request has been replied to, please visit LocalHost.com"
  end

  it '-> sends reply owner a text if his reply has been chosen' do
    user = FactoryGirl.create(:user)
    smshandler.send_tour_accepted(user)
    open_last_text_message_for phone_number
    expect(current_text_message).to have_body "A user has accepted your tour request, please go online to check details."
  end



end
