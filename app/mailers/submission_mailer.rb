class SubmissionMailer < ApplicationMailer
  default from: email_address_with_name("opentss@mit.edu", "OpenTSS: Countering Tenant Screening")

  def submission_complete_email
    @submission = params[:submission]

    @locale = params[:locale]
    
    I18n.with_locale(@locale) do 
      mail(to: @submission.email, bcc: "opentss@mit.edu" subject: I18n.t("submission_mailer.submission_complete_email.subject"))
    end
  end
  
  def submissions_retrieve_email
    @token = params[:token]
    @email = params[:email]
    @locale = params[:locale]
    
    I18n.with_locale(@locale) do 
      mail(to: @email, subject: I18n.t("submission_mailer.submissions_retrieve_email.subject"))
    end
  end



  def submission_reupload_request_email
    @submission = params[:submission]
    @submission.update_token!
    @token = @submission.retrieve_token

    @locale = params[:locale]
    
    I18n.with_locale(@locale) do 
      mail(to: @submission.email, subject: I18n.t("submission_mailer.submission_reupload_request_email.subject") )
    end
  end


  def submission_reupload_complete_email
    @submission = params[:submission]

    @locale = params[:locale]
    
    I18n.with_locale(@locale) do 
      mail(to: @submission.email, bcc:"opentss@mit.edu", subject: I18n.t("submission_mailer.submission_reupload_complete_email.subject") )
    end
  end

end
