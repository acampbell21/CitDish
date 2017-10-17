class Api::ProjectsController < ApplicationController
  before_action :set_project, except: [:index, :create]

  def index
    @projects = current_user.projects
  end

  def show
  end

  def create
    @project = current_user.projects.create(project_params)

    params[:project][:files].each do |file|
      if pages = file["pages"]
        pages.times do |page_number|
          url = Cloudinary::Utils.cloudinary_url("#{file[:public_id]}.jpg", page: page_number + 1)
          @project.pages.create(media_url: url)
        end
      else
        @project.pages.create(media_url: file["url"])
      end
    end
    render :show
  end

  def update
    #TODO: implement this
  end

  def destroy
    @project.destroy
  end

  private
    def project_params
      params.require(:project).permit(:title, :active, clients: [])
    end

    def set_project
      @project = current_user.projects.find(params[:id])
    end
end
