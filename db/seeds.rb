test_user = User.find_by(email: 'test@test.com')
admin_user = User.find_by(email: 'admin@test.com')

unless test_user
  User.create(name: 'Test Testerson', phone: '801-888-8888',
              email: 'test@test.com', password: 'password',
              team_id: '1',
              image: 'https://sing.stanford.edu/site/images/missing.png')
  puts 'Test Users Seeded'
end

unless admin_user
  team = Team.create
  team.users.create(name: 'Admin User', phone: '801-999-9999',
              email: 'admin@test.com', password: 'password', role: 'admin',
              image: 'https://sing.stanford.edu/site/images/missing.png')
  puts 'Admin Seeded'
end
  