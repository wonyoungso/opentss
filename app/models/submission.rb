class Submission < ApplicationRecord
  has_many_attached :reports
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
  validates :minimum_rent, :presence => true
  validates :landlord_name, :presence => true
  validates :landlord_scale, :presence => true
  validates :property_address, :presence => true
  validates :property_address_city, :presence => true
  validates :property_address_state, :presence => true
  validates :property_address_zipcode, :presence => true
  validates :interview_possible, :presence => true
  validates :email, :presence => true

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
    self.reports.attach(params[:files])
  end

  def self.update_token(submissions)
    token = Devise.friendly_token
    sent_at = DateTime.now.utc

    submissions.each do |submission|
      submission.retrieve_token = token
      submission.retrieve_sent_at = sent_at
      submission.save(validate: false)
    end

    return token
  end

end
