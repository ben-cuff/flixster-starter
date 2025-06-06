import propTypes from "prop-types";

export default function SortBy({ handleSortByChange }) {
	return (
		<select
			onChange={(event) => {
				handleSortByChange(event);
			}}
		>
			<option value="default">Sort By</option>
			<option value="title">Title: Alphabetical</option>
			<option value="release">Release date: new to old</option>
			<option value="rating">Rating: high to low</option>
		</select>
	);
}

SortBy.propTypes = {
	handleSortByChange: propTypes.func,
};
