import propTypes from "prop-types";

export default function MovieCard({ movie }) {
	console.log(movie);
	console.log(`https://image.tmdb.org/t/p/w100${movie.poster_path}`);
	return (
		<div className="movie-card">
			<img
				src={`https://image.tmdb.org/t/p/w400${movie.poster_path}`}
				alt={movie.title}
			/>
		</div>
	);
}

MovieCard.propTypes = {
	movie: propTypes.object,
};
