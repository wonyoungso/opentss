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

  def query_email
    @submissions = Submission.where(email: params[:email])
    @submission_exist = @submissions.count > 0 

    if @submission_exist
      
      @token = Submission.update_token(@submissions)
      SubmissionMailer.with(token: @token, email: params[:email]).submissions_retrieve_email.deliver_later


      render json: {
        success: true,
        submission_exist: @submission_exist
      }
    else
      render json: {
        success: false,
        submission_exist: @submission_exist
      }
    end

  rescue 
    render json: {
      success: false
    }, :status => :bad_request
  end

  def retrieve_result
    @submissions = Submission.where(retrieve_token: params[:token]).select(:id, :email, :created_at, :status, :retrieve_sent_at)

    @submissions_unexpired = @submissions.select { |submission| !submission.retrieve_period_expired? }

    
    if @submissions_unexpired.size > 0
      render json: {
        success: true,
        submissions: @submissions_unexpired
      }
    else
      render json: {
        success: false,
        submissions: [],
        message: "No submissions unexpired"
      }
    end
  end

end