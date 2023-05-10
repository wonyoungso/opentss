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
            @submission.grant_reward!
            
            flash[:notice] = "Successfully granted a reward for the submission #{@object.id}"
            redirect_to back_or_index
          end
        end
      end
    end
  end
end