RailsAdmin.config do |config|

  require Rails.root.join('lib', 'rails_admin', 'rails_admin_grant_reward.rb')
  config.asset_source = :sprockets

  ### Popular gems integration

  ## == Devise ==
  config.authenticate_with do
    warden.authenticate! scope: :user
  end
  config.current_user_method(&:current_user)

  ## == CancanCan ==
  config.authorize_with :cancancan

  ## == Pundit ==
  # config.authorize_with :pundit

  ## == PaperTrail ==
  # config.audit_with :paper_trail, 'User', 'PaperTrail::Version' # PaperTrail >= 3.0.0

  ### More at https://github.com/railsadminteam/rails_admin/wiki/Base-configuration

  ## == Gravatar integration ==
  ## To disable Gravatar integration in Navigation Bar set to false
  # config.show_gravatar = true

  config.actions do
    dashboard                     # mandatory
    index                         # mandatory
    new
    export
    bulk_delete
    show
    edit
    delete
    show_in_app
    grant_reward
    download_report
    reupload_request

    ## With an audit adapter, you can add:
    # history_index
    # history_show
  end

  config.model 'Company' do 
    list do
      field :name
      field :url
      field :descriptions
    end
  end


  config.model 'ReportStatistic' do 
    list do
      field :id
      field :company
      field :total
    end
  end

  config.model 'Submission' do 
    list do
      field :id
      field :email
      field :created_at
      field :confirmed # email confirm
      field :status
      field :reward_granted_at
    end
  end

  config.model 'Description' do 
    list do
      field :title
      field :desc_type
      field :subtitle
      field :companies
    end
  end
end
