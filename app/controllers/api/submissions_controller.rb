class Api::SubmissionsController < ApplicationController
  def create
    @submission = Submission.new
    @submission.put_params(params)
    if @submission.save
      SubmissionMailer.with(submission: @submission).submission_complete_email.deliver_later

      render json: {
        success: true
      }
    else
      render json: {
        errors: @submission.errors,
        success: false
      }, :status => :bad_request
    end
  end

end