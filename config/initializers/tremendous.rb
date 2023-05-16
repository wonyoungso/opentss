require 'tremendous'
url = "https://testflight.tremendous.com/api/v2/"
TREMENDOUS_LIBRARY = Tremendous::Rest.new(Rails.application.credentials.dig(:tremendous, :sandbox_access_token), url) 
