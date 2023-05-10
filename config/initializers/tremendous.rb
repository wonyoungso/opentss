require 'tremendous'
url = "https://testflight.tremendous.com/api/v2/"
TREMENDOUS_LIBRARY = Tremendous::Rest.new(Rails.application.credentials.dig(:tremendous, :access_token), url) 
