module ApplicationHelper

  def resource_name
    :user
  end

  def resource
    @resource ||= User.new
  end

  def devise_mapping
    @devise_mapping ||= Devise.mappings[:user]
  end


  def bootstrap_class_for flash_type
    { success: "alert-success", error: "alert-danger", alert: "alert-warning", notice: "alert-info" }[flash_type.to_sym]
  end

  def flash_messages(opts = {})
    flash.each do |msg_type, message|
      concat(content_tag(:div, message, class: "alert #{bootstrap_class_for(msg_type)} fade in") do
              concat content_tag(:button, 'x'.html_safe, class: "close", data: { dismiss: 'alert' })
              concat message
            end)
      flash.clear
    end
    nil
  end

  def average_stars(rating)
    rating = 0 if rating.nil?
    remainder = (5 - rating.round )
    '★' * rating.round + "☆" * remainder
  end

end
