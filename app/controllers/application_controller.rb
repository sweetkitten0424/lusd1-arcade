require "net/http"
require "json"

class ApplicationController < ActionController::API
  before_action :authenticate_user!

  private

  def authenticate_user!
    token = request.headers["Cf-Access-Jwt-Assertion"] ||
            request.headers["Authorization"]&.split(" ")&.last

    return render json: { error: "Authentication required" }, status: :unauthorized if token.blank?

    payload = verify_cf_access_jwt(token)
    email = payload["email"]
    return render json: { error: "Email missing from Cloudflare token" }, status: :unauthorized if email.blank?

    @current_user = User.find_or_create_by!(email: email) do |user|
      base_name = email.split("@").first.gsub(/[^a-zA-Z0-9_]/, "")
      user.username = User.exists?(username: base_name) ? "#{base_name}_#{rand(100..999)}" : base_name
    end
  rescue JWT::DecodeError, StandardError => e
    render json: { error: "Unauthorized: #{e.message}" }, status: :unauthorized
  end

  def verify_cf_access_jwt(token)
    team_domain = ENV.fetch("CF_ACCESS_TEAM_DOMAIN")
    aud_tag = ENV.fetch("CF_ACCESS_AUD")

    jwks_uri = URI("#{team_domain}/cdn-cgi/access/certs")
    jwks_raw = Net::HTTP.get(jwks_uri)
    jwks = JWT::JWK::Set.new(JSON.parse(jwks_raw))

    decoded, = JWT.decode(
      token,
      nil,
      true,
      {
        algorithms: ["RS256"],
        aud: aud_tag,
        verify_aud: true,
        iss: team_domain,
        verify_iss: true,
        jwks: jwks
      }
    )
    decoded
  end

  attr_reader :current_user
end

