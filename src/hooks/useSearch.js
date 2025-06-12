import { useState } from "react";
import { movieApi } from "../api/movie-api";

export function useSearch(setNextPage, setMovieData) {
	const [searchInput, setSearchInput] = useState("");

	const handleSearchSubmit = () => {
		(async () => {
			try {
				setNextPage(1);
				const formattedSearchInput = searchInput.split(" ").join("+");

				const data = await movieApi.searchMovies(formattedSearchInput);

				setMovieData(data.results);
			} catch (error) {
				console.error(error);
			}
		})();
	};

	return { searchInput, setSearchInput, handleSearchSubmit };
}
