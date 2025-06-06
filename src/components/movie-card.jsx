import propTypes from "prop-types";
import "./movie-card.css";

export default function MovieCard({ movie }) {
	if (movie) {
		return (
			<div className="movie-card">
				<img
					src={`https://image.tmdb.org/t/p/w400${movie.poster_path}`}
					alt={movie.title}
				/>
				<h4>{movie.title}</h4>
				<p>Rating: {movie.vote_average}</p>
			</div>
		);
	}
}

MovieCard.propTypes = {
	movie: propTypes.object,
};
