class AuthenticationController < ApplicationController
    include Response

    before_action :authorize_request, except: :login

    def login
      @user = User.find_by_email(params[:email])
      if @user&.authenticate(params[:password])

        token = JsonWebToken.encode(user_id: @user.id)
        time = Time.now + 24.hours.to_i

        json_response({ 
            token: token, 
            exp: time.strftime("%m-%d-%Y %H:%M"),
            username: @user.username 
        })
      else
        json_response({ error: 'unauthorized' }, status: :unauthorized)
      end
    end
  
    private
  
    def login_params
      params.permit(:email, :password)
    end
end
