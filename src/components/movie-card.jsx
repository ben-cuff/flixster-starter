import propTypes from "prop-types";
import { useState } from "react";
import "./movie-card.css";
import MovieModal from "./movie-modal";

export default function MovieCard({ movie, setMovieData }) {
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
					<span className="icon-img">
						<img
							src={movie.liked ? "heart.svg" : "heart-outline.svg"}
							alt="liked status"
							onClick={(e) => {
								e.stopPropagation();
								setMovieData((prevMovies) =>
									prevMovies.map((m) =>
										m.id === movie.id ? { ...m, liked: !m.liked } : m
									)
								);
							}}
						/>

						<h4>{movie.title}</h4>
						<img
							src={
								movie.watched ? "eye-outline.svg" : "eye-off-outline.svg"
							}
							alt="watched status"
							className="icon-img"
							onClick={(e) => {
								e.stopPropagation();
								setMovieData((prevMovies) =>
									prevMovies.map((m) =>
										m.id === movie.id ? { ...m, watched: !m.watched } : m
									)
								);
							}}
						/>
					</span>
					<p>Rating: {movie.vote_average}</p>
				</div>
			</>
		);
	}
}

MovieCard.propTypes = {
	movie: propTypes.object.isRequired,
	setMovieData: propTypes.func.isRequired,
};
