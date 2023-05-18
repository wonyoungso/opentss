class Submission < ApplicationRecord
  has_many_attached :reports
  encrypts_attached :reports
  belongs_to :company, optional: true
  before_create :generate_confirmation_token

  encrypts :email, deterministic: true
  
  encrypts :printed_name
  encrypts :gender
  encrypts :transgender
  encrypts :is_hispanic_or_latino
  encrypts :race
  encrypts :age
  encrypts :partner
  encrypts :dependents
  encrypts :income
  encrypts :accepted
  encrypts :security_deposit
  encrypts :rent
  encrypts :bedrooms
  encrypts :house_type
  encrypts :voucher
  encrypts :minimum_rent
  encrypts :landlord_name
  encrypts :landlord_scale
  encrypts :property_address
  encrypts :property_address_city
  encrypts :property_address_state
  encrypts :property_address_zipcode
  encrypts :experience_freeform
  encrypts :interview_possible
  encrypts :report_date_month
  encrypts :report_date_year
  encrypts :rent_apply_date_month
  encrypts :rent_apply_date_year


  validates :printed_name, :presence => true
  validates :gender, :presence => true
  validates :transgender, :presence => true
  validates :is_hispanic_or_latino, :presence => true
  validates :race, :presence => true
  validates :age, :presence => true
  validates :partner, :presence => true
  validates :dependents, :presence => true
  validates :income, :presence => true
  validates :accepted, :presence => true
  validates :security_deposit, :presence => true
  validates :rent, :presence => true
  validates :bedrooms, :presence => true
  validates :house_type, :presence => true
  validates :voucher, :presence => true
  validates :landlord_name, :presence => true
  validates :landlord_scale, :presence => true
  validates :property_address, :presence => true
  validates :property_address_city, :presence => true
  validates :property_address_state, :presence => true
  validates :property_address_zipcode, :presence => true
  validates :interview_possible, :presence => true
  validates :email, :presence => true, :uniqueness => true
  validates :report_date_month, :presence => true
  validates :report_date_year, :presence => true
  validates :rent_apply_date_month, :presence => true
  validates :rent_apply_date_year, :presence => true

  validates :reports, attached: {message: "Tenant screening reports should be attached. Please check previous page and upload them."}, 
                      content_type: { in: ['image/*', "image/jpeg", "image/png", "image/jpg", 'image/heif', 'image/heic', 'application/pdf'], message: 'Tenant screening reports are not a PDF or valid image.' } 

  def generate_confirmation_token
    self.confirmation_token = Devise.friendly_token
    self.confirmation_sent_at = DateTime.now.utc
  end

  def retrieve_period_expired?
   self.retrieve_sent_at && (DateTime.now.utc > self.retrieve_sent_at.utc + 1.day)
  end



  def put_params(params)
    self.consented = params[:consented]
    self.consented_at = DateTime.parse(params[:consented_at])
    self.printed_name = params[:printed_name]
    self.gender = params[:gender]
    self.transgender = params[:transgender]
    self.is_hispanic_or_latino = params[:is_hispanic_or_latino]
    self.race = params[:race]
    self.age = params[:age]
    self.partner = params[:partner]
    self.dependents = params[:dependents]
    self.income = params[:income]
    self.accepted = params[:accepted]
    self.security_deposit = params[:security_deposit]
    self.rent = params[:rent]
    self.bedrooms = params[:bedrooms]
    self.house_type = params[:house_type]
    self.voucher = params[:voucher]
    self.minimum_rent = params[:minimum_rent]
    self.landlord_name = params[:landlord_name]
    self.landlord_scale = params[:landlord_scale]
    self.property_address = params[:property_address]
    self.property_address_city = params[:property_address_city]
    self.property_address_state = params[:property_address_state]
    self.property_address_zipcode = params[:property_address_zipcode]
    self.experience_freeform = params[:experience_freeform]
    self.interview_possible = params[:interview_possible]
    self.email = params[:email] 
    self.report_date_month = params[:report_date_month]
    self.report_date_year = params[:report_date_year]
    self.rent_apply_date_month = params[:rent_apply_date_month]
    self.rent_apply_date_year = params[:rent_apply_date_year]
  
    self.reports.attach(params[:files])
  end 

  def self.update_token_all(submissions)

    submissions.each do |submission|
      submission.update_token!
    end

    return token
  end

  def update_token!

    token = Devise.friendly_token
    sent_at = DateTime.now.utc
    
    self.retrieve_token = token
    self.retrieve_sent_at = sent_at
    self.save(validate: false)
  end

  def grant_reward!
    # Campaigns are created within the dashboard by team admins.
    # They define the catalog and presentation of your reward.
    # API requests can always override these settings
    # within the specific reward object by specifying the catalog, message, etc.
    campaigns = TREMENDOUS_LIBRARY.campaigns.list
    campaign_id = campaigns.first[:id]
    
    # The funding source you select is how you are charged for the order.
    # In this example, we use the prefunded balance funding source
    funding_source_id = TREMENDOUS_LIBRARY.funding_sources.list.find { |f| f[:method] == "balance" }[:id]
    
    # Optionally pass a unique external_id for each order create call
    # to guarantee that your order is idempotent and not executed multiple times.
    
    # An hash representing the rewards you'd like to send.
    order_data = {
      external_id: self.id,
      payment: {
        funding_source_id: funding_source_id,
      },
      rewards: [{
        value: {
          denomination: 50,
          currency_code: 'USD'
        },
        campaign_id: campaign_id,
        delivery: {
          method: 'EMAIL',
        },
        recipient: {
          email: self.email,
          name: self.printed_name
        }
      }]
    }
    
    # Submit the order.
    order = TREMENDOUS_LIBRARY.orders.create!(order_data)
    # Retrieve the reward.
    reward = TREMENDOUS_LIBRARY.rewards.show(order[:rewards].first[:id])

    ## need to document gift card sent at and status change 
    self.reward_granted_at = DateTime.now
    self.status = "reward_granted"
    self.order_tremendous_json = order
    self.reward_tremendous_json = reward
    self.save
  end


  def request_valid?(private_key:, request:)
    signature_header = request.headers['Tremendous-Webhook-Signature']
    algorithm, received_signature = signature_header.split('=', 2)
  
    expected_signature = OpenSSL::HMAC.hexdigest(
      OpenSSL::Digest.new('sha256'), private_key, request.body.read
    )
  
    received_signature == expected_signature
  end
  
  def report_decrypt_download
             
    zip_file = Tempfile.new("reports.zip")
    files = []

    Zip::File.open(zip_file.path, Zip::File::CREATE) do |zipfile|
          
      self.reports.each do |report|
        filename = report.blob.filename
        tempfile = Tempfile.new(filename.to_s)
        
        tempfile.binmode
        tempfile.write(report.download)
        tempfile.rewind
        tempfile.close

        files << tempfile
        zipfile.add(SecureRandom.hex(5) + "_" + filename.to_s, tempfile.path)
        
      end

    end

    zip_data = File.read(zip_file.path)
      
    zip_file.close
    zip_file.unlink
    files.each do |f|
      f.unlink
    end
    zip_data
  end

end
