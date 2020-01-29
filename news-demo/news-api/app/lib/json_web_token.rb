class JsonWebToken
    SECRET_KEY = Rails.application.secrets.secret_key_base. to_s
  
    # Set to 60 days for demo purpose only
    def self.encode(payload, exp = 60.days.from_now)
      payload[:exp] = exp.to_i
      JWT.encode(payload, SECRET_KEY)
    end
  
    def self.decode(token)
      decoded = JWT.decode(token, SECRET_KEY)[0]
      HashWithIndifferentAccess.new decoded
    end
end