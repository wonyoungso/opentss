class SubmissionMailer < ApplicationMailer
  default from: "opentss@mit.edu"

  def submission_complete_email
    @submission = params[:submission]
    mail(to: @submission.email, subject: 'Your submission of tenant screening reports is completed :: OpenTSS: Countering Tenant Screening')
  end
  
  def submissions_retrieve_email
    @token = params[:token]
    @email = params[:email]
    mail(to: @email, subject: 'Here is a secure link for you to retrieve your submission :: OpenTSS: Countering Tenant Screening')
  end



  def submission_reupload_request_email
    @submission = params[:submission]
    @submission.update_token!
    @token = @submission.retrieve_token
    mail(to: @submission.email, subject: 'Screening Report Reupload Request :: OpenTSS: Countering Tenant Screening')
  end


  def submission_reupload_complete_email
    @submission = params[:submission]
    mail(to: @submission.email, subject: 'Reuploading your report is completed :: OpenTSS: Countering Tenant Screening')
  end

end
