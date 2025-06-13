import { useCallback, useState } from "react";
import { movieApi } from "../api/movie-api";

export function useSearch(setNextPage, setMovieData) {
	const [searchInput, setSearchInput] = useState("");

	const handleSearchSubmit = useCallback(() => {
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
	}, [searchInput, setNextPage, setMovieData]);

	return { searchInput, setSearchInput, handleSearchSubmit };
}
