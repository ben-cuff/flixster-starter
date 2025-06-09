import propTypes from "prop-types";
import { useEffect, useState } from "react";
import YouTube from "react-youtube";
import GENRES_LIST from "../contants/genres";
import "./movie-modal.css";

export default function MovieModal({ setToggleModal, movie }) {
	const [movieDetails, setMovieDetails] = useState([]);
	const [movieVideo, setMovieVideo] = useState("");

	useEffect(() => {
		(async () => {
			try {
				const accessToken = import.meta.env.VITE_IMDB_ACCESS_TOKEN;

				const [responseDetails, responseVideo] = await Promise.all([
					fetch(
						`https://api.themoviedb.org/3/movie/${movie.id}?language=en-US`,
						{
							method: "GET",
							headers: {
								accept: "application/json",
								Authorization: `Bearer ${accessToken}`,
							},
						}
					),
					fetch(
						`https://api.themoviedb.org/3/movie/${movie.id}/videos?language=en-US`,
						{
							method: "GET",
							headers: {
								accept: "application/json",
								Authorization: `Bearer ${accessToken}`,
							},
						}
					),
				]);

				const [dataDetails, dataVideo] = await Promise.all([
					responseDetails.json(),
					responseVideo.json(),
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
	}, [movie]);

	const genres = movie.genre_ids.map((genre_id) => {
		return GENRES_LIST.filter((genre) => {
			return genre.id === genre_id;
		});
	});

	return (
		<div className="overlay-style">
			<div className="modal-style">
				<h2>{movie.title}</h2>
				<img
					src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
					alt={`${movie.title} backdrop`}
					style={{
						width: "100%",
						borderRadius: "8px",
						marginBottom: "15px",
					}}
				/>
				<ul style={{ listStyle: "none", padding: 0 }}>
					<li>
						<strong>Runtime:</strong> {movieDetails.runtime} minutes
					</li>
					<li>
						<strong>Release Date:</strong> {movie.release_date}
					</li>
					<li>
						<strong>Genres:</strong>{" "}
						{movie.genre_ids
							.map((genre_id) => {
								const genre = GENRES_LIST.find(
									(g) => g.id === genre_id
								);
								return genre ? genre.name : "N/A";
							})
							.join(", ")}
					</li>
				</ul>
				<p>{movie.overview}</p>
				<YouTube
					videoId={movieVideo}
					opts={{ width: "300", height: "200" }}
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
