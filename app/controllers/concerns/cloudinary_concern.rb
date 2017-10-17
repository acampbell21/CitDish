module CloudinaryConcern
  extend ActiveSupport::Concern

  def upload_file(params)
    uploaded_image_name = params.keys.first
    uploaded_file = params[uploaded_image_name]

    Cloudinary::Uploader.upload(uploaded_file, auth)
  end

  def multiple_upload(file)
    Cloudinary::Uploader.upload(file, auth)
  end

  private
    def auth
      {
        cloud_name: ENV['CLOUDINARY_CLOUD_NAME'],
        api_key: ENV['CLOUDINARY_API_KEY'],
        api_secret: ENV['CLOUDINARY_API_SECRET'],
      }
    end
end
