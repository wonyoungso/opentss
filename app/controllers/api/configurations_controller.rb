class Api::ConfigurationsController < ApplicationController
  def index
    @configuration = PublishConfiguration.first
    if @configuration.present?
      render json: {
        success: true,
        publish_survey: @configuration.publish_survey.present? ? @configuration.publish_survey : false
      }
    else
      render json: {
        success: true,
        publish_survey: false
      }
    end
  end
end