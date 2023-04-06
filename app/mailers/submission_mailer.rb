class SubmissionMailer < ApplicationMailer
  default from: "wso@mit.edu"

  def submission_complete_email
    @submission = params[:submission]
    mail(to: @submission.email, subject: 'Your submission of tenant screening reports is complete :: OpenTSS: Countering Tenant Screening')
  end
end
