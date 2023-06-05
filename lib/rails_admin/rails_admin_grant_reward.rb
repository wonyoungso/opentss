module RailsAdmin
  module Config
    module Actions
      # common config for custom actions
      class CustomAction < RailsAdmin::Config::Actions::Base
        register_instance_option :member do  #	this is for specific record
          true
        end
        register_instance_option :pjax? do
          false
        end
        register_instance_option :visible? do
          authorized? 		# This ensures the action only shows up for the right class
        end
      end
      
      class GrantReward < CustomAction
        RailsAdmin::Config::Actions.register(self)
        register_instance_option :only do
          # model name here
          "Submission"
        end
        register_instance_option :link_icon do
          'fa fa-dollar-sign' # use any of font-awesome icons
        end
        register_instance_option :http_methods do
          [:get, :post]
        end
        register_instance_option :controller do
          Proc.new do
            # call model.method here
            # byebug

            @submission = Submission.find @object.id 
            if @submission.status == "submitted"
              @submission.grant_reward!
          
              flash[:notice] = "Successfully granted a reward for the submission #{@object.id}"
              redirect_to back_or_index
            else
              flash[:alert] = "A reward can only be granted in submitted status. #{@object.id}"
              redirect_to back_or_index
            end

          end
        end
      end

      class DownloadReport < CustomAction
        RailsAdmin::Config::Actions.register(self)
        register_instance_option :only do
          # model name here
          "Submission"
        end
        register_instance_option :link_icon do
          'fa fa-file-pdf' # use any of font-awesome icons
        end
        register_instance_option :http_methods do
          [:get, :post]
        end
        register_instance_option :controller do
          Proc.new do
            # call model.method here
            # byebug

            @submission = Submission.find @object.id 
            @final_zip = @submission.report_decrypt_download

            unless @final_zip == nil
              send_data(@final_zip, :type => 'application/zip', :filename => "report_#{@submission.id}_#{SecureRandom.hex(4)}.zip")
            else
              render json: { sucess: false, message: "No Reports found"}, :status => 500
            end
            
          end
        end
      end

      class ReuploadRequest < CustomAction
        RailsAdmin::Config::Actions.register(self)
        register_instance_option :only do
          # model name here
          "Submission"
        end
        register_instance_option :link_icon do
          'fa fa-code-pull-request' # use any of font-awesome icons
        end
        register_instance_option :http_methods do
          [:get, :post]
        end
        register_instance_option :controller do
          Proc.new do
            # call model.method here
            # byebug

            @submission = Submission.find @object.id 
            
            SubmissionMailer.with(submission: @submission, locale: @submission.locale).submission_reupload_request_email.deliver_later

            flash[:notice] = "Successfully requested a reupload request to ##{@submission.id}"
            redirect_to back_or_index
          end
        end
      end

    end
  end
end