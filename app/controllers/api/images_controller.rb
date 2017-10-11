class Api::ImagesController < ApplicationController
  include CloudinaryConcern

  def add_user_image
    uploaded_image_name = params.keys.first
    uploaded_file = params[uploaded_image_name]

    begin
      url = upload_image(uploaded_file)['url']
      current_user.update(image: url)
      render json: url
    rescue => e
      unprocessable([e])
    end
  end

  def add_company_image
    uploaded_image_name = params.keys.first
    uploaded_file = params[uploaded_image_name]

    begin
      url = upload_image(uploaded_file)['url']
      current_user.update(company_image: url)
      render json: url
    rescue => e
      unprocessable([e])
    end
  end
end
