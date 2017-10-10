test_user = User.find_by(email: 'test@test.com')
admin_user = User.find_by(email: 'admin@test.com')
team = Team.first
unless team
  team = Team.create
end

unless test_user
  team.users.create(name: 'Test Testerson', phone: '801-888-8888',
              email: 'test@test.com', password: 'password',
              image: 'https://sing.stanford.edu/site/images/missing.png')
  puts 'Test Users Seeded'
end

unless admin_user
  team.users.create(name: 'Admin User', phone: '801-999-9999',
              email: 'admin@test.com', password: 'password', role: 'admin',
              image: 'https://sing.stanford.edu/site/images/missing.png')
  puts 'Admin Seeded'
end
  