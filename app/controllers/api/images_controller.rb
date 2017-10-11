class Api::ImagesController < ApplicationController
  def add_user_image
    auth = {
      cloud_name: ENV['CLOUD_NAME'],
      api_key: ENV['API_KEY'],
      api_secret: ENV['API_SECRET'],
    }

    uploaded_image_name = params.keys.first
    uploaded_file = params[uploaded_image_name]

    begin
      cloud_image = Cloudinary::Uploader.upload(uploaded_file, auth)
      url = cloud_image['url']
      current_user.update(image: url)
      render json: url
    rescue => e
      render json: { errors: e }, status: :bad_request
    end
  end

  def add_company_image
    auth = {
      cloud_name: ENV['CLOUD_NAME'],
      api_key: ENV['API_KEY'],
      api_secret: ENV['API_SECRET'],
    }

    uploaded_image_name = params.keys.first
    uploaded_file = params[uploaded_image_name]

    begin
      cloud_image = Cloudinary::Uploader.upload(uploaded_file, auth)
      url = cloud_image['url']
      current_user.update(company_image: url)
      render json: url
    rescue => e
      render json: { errors: e }, status: :bad_request
    end
  end
end
