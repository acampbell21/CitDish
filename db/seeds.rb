test_user = User.find_by(email: 'user@test.com')
admin_user = User.find_by(email: 'admin@test.com')
team = Team.first
team = Team.create unless team

unless test_user
  team.users.create(name: 'Test User', phone: '801-888-8888',
              email: 'user@test.com', password: 'password',
              company_name: 'Default Company Name')
  puts 'Test User Seeded'
end

unless admin_user
  team.users.create(name: 'Admin User', phone: '801-999-9999',
              email: 'admin@test.com', password: 'password', role: 'admin',
              company_name: 'Default Company Name')
  puts 'Admin Seeded'
end
