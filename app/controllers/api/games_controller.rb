class Api::GamesController < ApplicationController
  def index
    render json: Game.all.order(:title)
  end

  def show
    game = Game.find_by!(slug: params[:slug])
    top_scores = game.scores.includes(:user).order(points: :desc).limit(10).map do |s|
      { id: s.id, username: s.user.username, points: s.points, date: s.created_at.to_date }
    end

    render json: { game: game, leaderboard: top_scores }
  end
end
