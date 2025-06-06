import propTypes from "prop-types";
import MovieCard from "./movie-card";
import "./movie-list.css";

export default function MovieList({ movieData }) {
	return (
		<div className="movie-card-container">
			{movieData ? (
				movieData.map((movie) => (
					<MovieCard key={movie.id} movie={movie} />
				))
			) : (
				<h3>Loading...</h3>
			)}
		</div>
	);
}

MovieList.propTypes = {
	movieData: propTypes.arrayOf(propTypes.object),
};
