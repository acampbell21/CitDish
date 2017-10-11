module CloudinaryConcern
  extend ActiveSupport::Concern

  def upload_image(file)
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