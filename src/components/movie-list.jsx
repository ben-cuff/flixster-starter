import propTypes from "prop-types";
import { useEffect, useState } from "react";
import MovieCard from "./movie-card";
import "./movie-list.css";

export default function MovieList({ movieData, setMovieData, curPage }) {
	const [filteredMovieData, setFilteredMovieData] = useState([]);

	useEffect(() => {
		const movieDataCopy = [...movieData];
		if (curPage === "liked") {
			setFilteredMovieData(movieDataCopy.filter((movie) => movie.liked));
		} else if (curPage === "watched") {
			setFilteredMovieData(
				movieDataCopy.filter((movie) => movie.watched)
			);
		} else {
			setFilteredMovieData(movieDataCopy);
		}
	}, [movieData, curPage]);

	return (
		<div className="movie-card-container">
			{filteredMovieData.length > 0 ? (
				filteredMovieData.map((movie) => (
					<MovieCard
						key={movie.id}
						movie={movie}
						setMovieData={setMovieData}
					/>
				))
			) : (
				<h3>No movies to display</h3>
			)}
		</div>
	);
}

MovieList.propTypes = {
	movieData: propTypes.arrayOf(propTypes.object),
	setMovieData: propTypes.func.isRequired,
	curPage: propTypes.string.isRequired,
};
