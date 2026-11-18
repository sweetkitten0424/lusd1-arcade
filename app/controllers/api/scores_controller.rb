class Api::ScoresController < ApplicationController
  before_action :authenticate_user!

  def create
    game = Game.find_by!(slug: params[:game_slug])
    score = current_user.scores.new(game: game, points: params[:points])

    if score.save
      render json: { message: "High score saved!", points: score.points }, status: :created
    else
      render json: { errors: score.errors.full_messages }, status: :unprocessable_entity
    end
  end
end
