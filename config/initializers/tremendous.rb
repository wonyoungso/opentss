require 'tremendous'
if rails.env.development?
  access_token = Rails.application.credentials.dig(:tremendous, :sandbox_access_token)
  api_url = Rails.application.credentials.dig(:tremendous, :sandbox_api_url)
else
  access_token = Rails.application.credentials.dig(:tremendous, :access_token)
  api_url = Rails.application.credentials.dig(:tremendous, :api_url)
end


TREMENDOUS_LIBRARY = Tremendous::Rest.new(access_token, api_url)