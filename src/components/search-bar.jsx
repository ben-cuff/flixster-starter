import propTypes from "prop-types";
import "./search-bar.css";

export default function SearchBar({
	setSearchInput,
	searchInput,
	handleSubmit,
}) {
	return (
		<form
			onSubmit={(event) => {
				event.preventDefault();
				handleSubmit();
			}}
		>
			<input
				placeholder="Search for movies"
				value={searchInput}
				className="search-input"
				onChange={(event) => {
					setSearchInput(event.target.value);
				}}
			></input>
			<button className="search-btn" type="submit">
				Submit
			</button>
			<button className="search-btn" onClick={() => setSearchInput("")}>
				Clear
			</button>
		</form>
	);
}

SearchBar.propTypes = {
	setSearchInput: propTypes.func.isRequired,
	searchInput: propTypes.string.isRequired,
	handleSubmit: propTypes.func.isRequired,
};
