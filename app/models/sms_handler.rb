class SmsHandler

  def initialize
    @account_sid = ENV['ACCOUNT_SID']
    @auth_token = ENV['AUTH_TOKEN']
    @twilio_phone = ENV['TWILIO_PHONE']
  end

  def send_you_have_reply(user)
    @client = Twilio::REST::Client.new @account_sid, @auth_token
    @client.account.messages.create({
      :from => @twilio_phone,
      :to => user.phone,
      :body => 'Your request has been replied to, please visit LocalHost.com',
    })
  end

  def send_tour_accepted(user)
    @client = Twilio::REST::Client.new @account_sid, @auth_token
    @client.account.messages.create({
      :from => @twilio_phone,
      :to => user.phone,
      :body => 'A user has accepted your tour request, please go online to check details.',
    })
  end
end
