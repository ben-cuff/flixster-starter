import propTypes from "prop-types";
import { useEffect, useState } from "react";
import YouTube from "react-youtube";
import { movieApi } from "../api/movie-api";
import GENRES_MAP from "../constants/genres";
import "./movie-modal.css";

export default function MovieModal({ setToggleModal, movie }) {
	const [movieDetails, setMovieDetails] = useState([]);
	const [movieVideo, setMovieVideo] = useState("");

	useEffect(() => {
		(async () => {
			try {
				const [dataDetails, dataVideo] = await Promise.all([
					movieApi.getMovieDetails(
						`https://api.themoviedb.org/3/movie/${movie.id}?language=en-US`
					),
					movieApi.getMovieVideos(
						`https://api.themoviedb.org/3/movie/${movie.id}/videos?language=en-US`
					),
				]);

				if (dataVideo.results && dataVideo.results.length > 0) {
					const trailer = dataVideo.results.find(
						(video) => video.type === "Trailer"
					);
					if (trailer) {
						setMovieVideo(trailer.key);
					}
				}
				setMovieDetails(dataDetails);
			} catch (error) {
				console.error(error);
			}
		})();
	}, [movie.id]);

	return (
		<div className="overlay-style">
			<div className="modal-style">
				<h2>{movie.title}</h2>
				<img
					src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
					alt={`${movie.title} backdrop`}
				/>
				<div className="movie-details">
					<div>
						<strong>Runtime:</strong> {movieDetails.runtime} minutes
					</div>
					<div>
						<strong>Release Date:</strong> {movie.release_date}
					</div>
					<div>
						<strong>Genres:</strong>{" "}
						{movie.genre_ids
							.map((genre_id) => {
								return GENRES_MAP[genre_id] || "N/A";
							})
							.join(", ")}
					</div>
				</div>
				<p>{movie.overview}</p>
				<YouTube
					videoId={movieVideo}
					opts={{ width: "420", height: "236" }}
				/>
				<button
					onClick={() => {
						setToggleModal(false);
					}}
				>
					Close
				</button>
			</div>
		</div>
	);
}

MovieModal.propTypes = {
	setToggleModal: propTypes.func.isRequired,
	movie: propTypes.object,
};
