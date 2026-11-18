namespace :db do
  desc "Create database, load schema, seed admin user, and scan games"
  task initial_setup: :environment do
    puts "==> Creating and migrating PostgreSQL database..."
    Rake::Task["db:prepare"].invoke

    puts "==> Creating default admin account..."
    User.find_or_create_by!(username: "admin") do |u|
      u.email = "admin@arcade.local"
      u.password = ENV.fetch("ADMIN_PASSWORD", "changeme123")
    end

    puts "==> Scanning game files into database..."
    Rake::Task["arcade:scan"].invoke

    puts "==> Initial database setup complete!"
  end
end

namespace :node do
  desc "Install dependencies and build production Next.js frontend assets"
  task :compile_assets do
    Dir.chdir(Rails.root) do
      puts "==> Installing Next.js Node dependencies..."
      system("npm install") || abort("Failed to install Node dependencies")

      puts "==> Compiling production Next.js assets..."
      system("npm run build") || abort("Failed to compile Next.js assets")
    end

    puts "==> Frontend assets compiled successfully!"
  end
end
