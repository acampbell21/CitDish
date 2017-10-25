namespace :payments do
  desc "Keeps a teams trial or invalidates it after 30 days"
  task check_trial: :environment do
    Team.where(trial: true) do |team|
      team.update(paid: false, trial: false) if team.created_at > team.created_at + 30.days
    end
  end

  desc "Sends out trial notifications"
  task trial_notifications: :environment do
    # TODO find out how often trial notifications should go out and implement this
  end
end
