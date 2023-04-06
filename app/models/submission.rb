class Submission < ApplicationRecord
  has_many_attached :reports

  encrypts :email, deterministic: true
  
  encrypts :printed_name
  encrypts :gender
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
  encrypts :property_address
  encrypts :property_address_city
  encrypts :property_address_state
  encrypts :property_address_zipcode
  encrypts :experience_freeform
  encrypts :interview_possible

  validates :printed_name, :presence => true
  validates :gender, :presence => true
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
  validates :property_address, :presence => true
  validates :property_address_city, :presence => true
  validates :property_address_state, :presence => true
  validates :property_address_zipcode, :presence => true
  validates :interview_possible, :presence => true

  def put_params(params)
    self.consented = params[:consented]
    self.consented_at = DateTime.parse(params[:consented_at])
    self.printed_name = params[:printed_name]
    self.gender = params[:gender]
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
    self.property_address = params[:property_address]
    self.property_address_city = params[:property_address_city]
    self.property_address_state = params[:property_address_state]
    self.property_address_zipcode = params[:property_address_zipcode]
    self.experience_freeform = params[:experience_freeform]
    self.interview_possible = params[:interview_possible]
    self.email = params[:email] 
    self.reports.attach(params[:files])
  end

end
