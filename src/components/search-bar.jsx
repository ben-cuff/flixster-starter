import propTypes from "prop-types";
import "./search-bar.css";

export default function SearchBar({
	setSearchInput,
	searchInput,
	handleSubmit,
	handleClear,
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
			/>
			<button className="search-btn" type="submit">
				Submit
			</button>
			<button type="button" className="search-btn" onClick={handleClear}>
				Clear
			</button>
		</form>
	);
}

SearchBar.propTypes = {
	setSearchInput: propTypes.func.isRequired,
	searchInput: propTypes.string.isRequired,
	handleSubmit: propTypes.func.isRequired,
	handleClear: propTypes.func.isRequired,
};
