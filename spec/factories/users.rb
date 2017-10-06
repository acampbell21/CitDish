FactoryGirl.define do
  factory :user do
    name "Test Testerson"
    email "test@test.com"
    phone "801-888-8888"
    role "user"
    image "https://sing.stanford.edu/site/images/missing.png"
    password "password"
    team
  end
end
