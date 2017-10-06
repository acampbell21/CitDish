source 'https://rubygems.org'
ruby '2.3.1'

# Rails Web Framework
gem 'rails', '~> 5.1.4'
# Use PostgreSQL As The Database Server
gem 'pg', '~> 0.18'
# Use Puma As The App Server
gem 'puma', '~> 3.7'
# Build JSON APIs
gem 'jbuilder', '~> 2.5'
# Multi Factor Auth
gem 'omniauth', '~> 1.6.1'
# User Auth
gem 'devise', '~> 4.3.0'
# JWT Token Auth For Devise
gem 'devise_token_auth', '~> 0.1.42'
# OpenTok For Live Video Chat
gem 'opentok'
# User Invitations
gem 'devise_invitable'

group :development, :test do
  # Call 'pry' anywhere in the code to stop execution and get a debugger console
  gem 'pry', '~> 0.11.1'
  # Fake Random Data
  gem 'faker', '~> 1.8.4'
  # Rspec For Testing
  gem 'rspec-rails', '~> 3.6.1'
  # Annotate Models And Rouutes With DB Schema Info
  gem 'annotate', '~> 2.7.2'
  # Hide Your Senstive Data
  gem 'dotenv-rails'
  # Open Mail In Development
  gem 'letter_opener'
  
end

group :test do
  # Clean Your Database Between Tests
  gem 'database_cleaner'
  # Generate Spec Coverage Docs
  gem 'simplecov', require: false
  # Model Factories For Ease Of Testing
  gem 'factory_girl_rails'
  # Easy Model Testing
  gem 'shoulda-matchers'
  # Webdriver For Browser Testing
  # gem 'selenium-webdriver'
  # DSL For Feature Specs
  # gem 'capybara-rails'
end

group :development do
  gem 'listen', '>= 3.0.5', '< 3.2'
  gem 'spring', '2.0.2'
  gem 'spring-watcher-listen', '~> 2.0.0'
end
