module RequestsHelper

  #Could we put this logic in here rather than in our model? Not sure if the
  #helper modules are meant to be used for the controller only?
  # def set_expiration_date
  #   if self.replies.any?
  #     self.expiration =  Date.today + 1000.days
  #   else
  #     self.expiration =  Date.today + 5.days
  #   end
  # end
  #
  # def build_reply(attributes = {}, user)
  #   attributes[:user] ||= user
  #   replies.build(attributes)
  # end
end
