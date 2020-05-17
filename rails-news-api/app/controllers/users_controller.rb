class UsersController < ApplicationController
    include Response
    include ExceptionHandler

    before_action :authorize_request, except: :create
    before_action :set_user, only: [:show, :update, :destroy]
  
    def index
        @users = User.all
        json_response(@users)
    end
  
    def show
        json_response(@user)
    end
  
    def create
        @user = User.create!(user_params)
        json_response(@user, :created)
    end
  
    def update
        @user.update(user_params)
        head :no_content
    end
  
    def destroy
        @user.destroy
        head :no_content
    end
  
    private
  
    def set_user
      @user = User.find_by_username!(params[:_username])
    end
  
    def user_params
      params.permit(
        :username, :email, :password, :password_confirmation
      )
    end
end
