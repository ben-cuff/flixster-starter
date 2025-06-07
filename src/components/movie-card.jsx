import propTypes from "prop-types";
import { useState } from "react";
import "./movie-card.css";
import MovieModal from "./movie-modal";

export default function MovieCard({ movie }) {
	const [toggleModal, setToggleModal] = useState(false);
	if (movie) {
		return (
			<>
				{toggleModal && (
					<MovieModal setToggleModal={setToggleModal} movie={movie} />
				)}
				<div
					className="movie-card"
					onClick={() => setToggleModal(!toggleModal)}
				>
					<img
						src={`https://image.tmdb.org/t/p/w400${movie.poster_path}`}
						alt={movie.title}
					/>
					<h4>{movie.title}</h4>
					<p>Rating: {movie.vote_average}</p>
				</div>
			</>
		);
	}
}

MovieCard.propTypes = {
	movie: propTypes.object,
};
