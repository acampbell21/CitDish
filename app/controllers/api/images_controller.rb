class Api::ImagesController < ApplicationController
  include CloudinaryConcern

  def add_user_image
    begin
      url = upload_file(params)['url']
      current_user.update(image: url)
      render json: url
    rescue => e
      unprocessable([e])
    end
  end

  def add_company_image
    begin
      url = upload_file(params)['url']
      current_user.update(company_image: url)
      render json: url
    rescue => e
      unprocessable([e])
    end
  end

  def add_project_images
    upload_response = []

    params.keys.each do |key|
      begin
        file = params[key]
        res = multiple_upload(file)
        format = res["format"]
        json = { type: format, name: "#{res["original_filename"]}.#{format}", url: res["url"], public_id: res["public_id"] }

        if format == 'pdf'
          json[:pages] = res["pages"]
          upload_response << json
        else
          url = Cloudinary::Utils.cloudinary_url(json[:public_id], :width => 150, :height => 150, :crop => :fill)
          json[:url] = url
          upload_response << json
        end
      rescue => e
        Rails.logger.error("Failed uploading project file: #{e}")
      end
    end
    render json: upload_response
  end
end
