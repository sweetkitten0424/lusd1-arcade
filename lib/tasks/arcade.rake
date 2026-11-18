namespace :arcade do
  desc "Scan public/games folder and sync games into PostgreSQL"
  task scan: :environment do
    games_dir = Rails.root.join("public", "games")
    files = Dir.glob("#{games_dir}/*.*")

    files.each do |file_path|
      filename = File.basename(file_path)
      ext = File.extname(filename).delete(".")
      slug = File.basename(filename, ".*").parameterize
      title = File.basename(filename, ".*").tr("_-", " ").titleize

      game = Game.find_or_initialize_by(slug: slug)
      game.update!(
        title: title,
        file_path: "/games/#{filename}",
        system: ext
      )
    end

    puts "Synced #{files.count} games into PostgreSQL!"
  end
end

