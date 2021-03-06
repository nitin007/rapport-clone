set :application, "rapport-clone"
set :scm, "git"
set :repository,  "git@github.com:nitin007/rapport-clone.git"
set :branch, "master"
set :deploy_to, "/var/www/app"
set :deploy_via, :remote_cache
set :copy_strategy, :checkout
set :keep_releases, 5
set :use_sudo, false
set :copy_compression, :bz2
set :normalize_asset_timestamps, false
set :document_root, "/var/www/app"
set :ssh_options, {:forward_agent => true}
set :user, "nodeuser"

role :app, "128.199.238.11"

namespace :deploy do
  task :start, :roles => :app do
    run "sudo restart #{application} || sudo start #{application}"
  end
 
  task :stop, :roles => :app do
    run "sudo stop #{application}"
  end
 
  task :restart, :roles => :app do
    start
  end
 
  task :npm_install, :roles => :app do
    run "cd #{release_path} && npm install"
  end
end
 
after "deploy:update", "deploy:cleanup"
after "deploy:update_code", "deploy:npm_install"

# set :scm, :git # You can set :scm explicitly or Capistrano will make an intelligent guess based on known version control directory names
# Or: `accurev`, `bzr`, `cvs`, `darcs`, `git`, `mercurial`, `perforce`, `subversion` or `none`

# role :web, "your web-server here"                          # Your HTTP server, Apache/etc
# role :app, "your app-server here"                          # This may be the same as your `Web` server
# role :db,  "your primary db-server here", :primary => true # This is where Rails migrations will run
# role :db,  "your slave db-server here"

# if you want to clean up old releases on each deploy uncomment this:
# after "deploy:restart", "deploy:cleanup"

# if you're still using the script/reaper helper you will need
# these http://github.com/rails/irs_process_scripts

# If you are using Passenger mod_rails uncomment this:
# namespace :deploy do
#   task :start do ; end
#   task :stop do ; end
#   task :restart, :roles => :app, :except => { :no_release => true } do
#     run "#{try_sudo} touch #{File.join(current_path,'tmp','restart.txt')}"
#   end
# end