class Reply < ActiveRecord::Base
  belongs_to :request
  belongs_to :user
  has_one :review
  has_many :pictures, dependent: :destroy

  def find_user(user_id)
    @username = User.find(user_id).username
  end

  def set_chosen
    self.chosen = true
    self.save
    self.request.resolved = true
    self.request.save
  end

  # account_sid = 'AC6bc135c3726740e0fadb9003ef1b44e4'
  # auth_token = '6269d5a1cd3d61b469972941ad95f9cb'
  #
  # # set up a client to talk to the Twilio REST API
  # @client = Twilio::REST::Client.new account_sid, auth_token
  #
  # # alternatively, you can preconfigure the client like so
  # Twilio.configure do |config|
  #   config.account_sid = account_sid
  #   config.auth_token = auth_token
  # end
  #
  # # and then you can create a new client without parameters
  # @client = Twilio::REST::Client.new
  #
  # # def send_text(message)
  # #   account_sid = '6269d5a1cd3d61b469972941ad95f9cb',
  # #   auth_token = '6269d5a1cd3d61b469972941ad95f9cb',
  # #   @client = Twilio::REST::Client.new account_sid, auth_token
  # #   @message = @client.messages.create(
  # #   to: '07791621716',
  # #   from: '+15005550006' ,
  # #   body: message
  # #   )
  # # end
  #
  # Twilio phone: +441945232061

  def message
    message = "Your tour has been chosen, please visit /replies"
  end

end
