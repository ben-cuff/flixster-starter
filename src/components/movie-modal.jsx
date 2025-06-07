import propTypes from "prop-types";
import GENRES_LIST from "../contants/genres";
import "./movie-modal.css";

export default function MovieModal({ setToggleModal, movie }) {
	const genres = movie.genre_ids.map((genre_id) => {
		return GENRES_LIST.filter((genre) => {
			return genre.id === genre_id;
		});
	});

	console.log(genres);

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
						<strong>Runtime:</strong> {movie.runtime} minutes
					</li>
					<li>
						<strong>Release Date:</strong> {movie.release_date}
					</li>
					<li>
						<strong>Genres:</strong>{" "}
						{genres.map((genreArray, index) => (
							<span key={index}>
								{genreArray[0].name}
								{index < genres.length - 1 ? ", " : ""}
							</span>
						))}
					</li>
				</ul>
				<p>{movie.overview}</p>
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
