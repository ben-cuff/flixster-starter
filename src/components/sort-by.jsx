export default function SortBy() {
	return (
		<select>
			<option value="default">Select By</option>
			<option value="title">Title: Alphabetical</option>
			<option value="release">Release date: new to old</option>
			<option value="rating">Rating: high to low</option>
		</select>
	);
}
