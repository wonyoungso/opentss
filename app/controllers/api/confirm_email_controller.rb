class Api::ConfirmEmailController < ApplicationController
  def confirm
    @submission = Submission.where(confirmation_token: params[:token]).first

    if @submission.present?
      @submission.confirmed = true
      @submission.confirmed_at = DateTime.now.utc
      @submission.save(validate: false)

      render json: {
        success: true,
        email: @submission.email
      }
    else
      render json: {
        success: false,
        message: "The token is invalid."
      }
    end
  end
end
