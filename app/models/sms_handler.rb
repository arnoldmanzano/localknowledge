class SmsHandler

  def initialize
    @account_sid = ENV['ACCOUNT_SID']
    @auth_token = ENV['AUTH_TOKEN']
  end

  def send_you_have_reply(user)
    @client = Twilio::REST::Client.new @account_sid, @auth_token
    @client.account.messages.create({
      :from => ENV['TWILIO_PHONE'],
      :to => user.phone,
      :body => 'Your request has been replied to, please visit LocalHost.com',
    })
  end

  def send_tour_accepted(user)
    account_sid = ENV['ACCOUNT_SID']
    auth_token = ENV['AUTH_TOKEN']
    @client = Twilio::REST::Client.new @account_sid, @auth_token
    @client.account.messages.create({
      :from => ENV['TWILIO_PHONE'],
      :to => user.phone,
      :body => 'A user has accepted your tour request, please go online to check details.',
    })
  end
end
