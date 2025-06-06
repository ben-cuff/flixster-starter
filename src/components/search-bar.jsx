import { useState } from "react";
import "./search-bar.css";

export default function SearchBar() {
	const [searchInput, setSearchInput] = useState("");

	const handleSubmit = (event) => {
		event.preventDefault();
		setSearchInput("");
	};

	return (
		<form onSubmit={handleSubmit}>
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
