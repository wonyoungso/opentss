class Api::SubmissionsController < ApplicationController
  def create
    @submission = Submission.new
    @submission.put_params(params)
    @locale = params[:locale]

    if @submission.save
      SubmissionMailer.with(submission: @submission, locale: @locale).submission_complete_email.deliver_later

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
    @locale = params[:locale]

    if @submission_exist
      @submission = @submissions.first
      @submission.update_token!

      @token = @submission.retrieve_token

      SubmissionMailer.with(token: @token, email: params[:email], locale: @locale).submissions_retrieve_email.deliver_later

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
  end

  def retrieve_result
    @submissions = Submission.where(retrieve_token: params[:token]).select(:id, :email, :created_at, :status, :retrieve_sent_at)

    @submissions_unexpired = @submissions.select { |submission| !submission.retrieve_period_expired? }

    
    if @submissions_unexpired.size > 0
      render json: {
        success: true,
        token: params[:token],
        submissions: @submissions_unexpired
      }
    else
      render json: {
        success: false,
        submissions: [],
        token: params[:token],
        message: "No submissions unexpired"
      }
    end
  end

  def reupload_report
    @submission = Submission.where(retrieve_token: params[:token]).select(:id, :email, :created_at, :status, :retrieve_sent_at).first

    if @submission.present?
      render json: {
        success: true,
        token: params[:token],
        submission: @submission
      }
    else
      render json: {
        success: false,
        submission: nil,
        token: params[:token],
        message: "No submission"
      }, status: 401
    end
  end

  def consent_form
    @submission = Submission.where(retrieve_token: params[:token]).select(:id, :email, :created_at, :status, :retrieve_sent_at, :consented_at).first

    if @submission.present?
      render json: {
        success: true,
        token: params[:token],
        submission: @submission
      }
    else
      render json: {
        success: false,
        submission: nil,
        token: params[:token],
        message: "No submission"
      }, status: 401
    end
  end

  def reupload_report_submit
    @submission = Submission.where(retrieve_token: params[:token]).first
    @locale = params[:locale]

    if @submission.present?
      @submission.reports.attach(params[:files])
      if @submission.save
        SubmissionMailer.with(submission: @submission, locale: @locale).submission_reupload_complete_email.deliver_later

        render json: {
          success: true
        }
      else
        render json: {
          errors: @submission.errors,
          success: false
        }, :status => :bad_request
      end
    else
      render json: {
        success: false,
        submission: nil,
        token: params[:token],
        message: "No submission"
      }, status: 401
    end
  end

end