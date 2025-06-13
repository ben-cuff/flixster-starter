import { useCallback, useEffect, useState } from "react";
import { movieApi } from "../api/movie-api";

export function useMovieData() {
	const [movieData, setMovieData] = useState([]);
	const [nextPage, setNextPage] = useState(2);
	const [defaultState, setDefaultState] = useState([]);

	useEffect(() => {
		fetchMovies(1);
	}, []);

	const fetchMovies = async (page, append = false) => {
		try {
			const data = await movieApi.getPage(page);

			const enrichedResults = data.results.map((movie) => ({
				...movie,
				liked: false,
				watched: false,
			}));

			if (append) {
				setMovieData((prev) => {
					const existingIds = new Set(prev.map((movie) => movie.id));
					const uniqueNewMovies = enrichedResults.filter(
						(movie) => !existingIds.has(movie.id)
					);
					return [...prev, ...uniqueNewMovies];
				});
				setDefaultState((prev) => {
					const existingIds = new Set(prev.map((movie) => movie.id));
					const uniqueNewMovies = enrichedResults.filter(
						(movie) => !existingIds.has(movie.id)
					);
					return [...prev, ...uniqueNewMovies];
				});
			} else {
				setMovieData(enrichedResults);
				setDefaultState(enrichedResults);
			}
		} catch (error) {
			console.error(error);
		}
	};

	const handleLoadMore = () => {
		fetchMovies(nextPage, true);
		setNextPage((prevPage) => prevPage + 1);
	};

	const handleSortByChange = useCallback(
		(event) => {
			const sortBy = event.target.value;

			if (sortBy === "title") {
				const sortedMovies = [...movieData].sort((a, b) =>
					a.title.localeCompare(b.title)
				);
				setMovieData(sortedMovies);
			} else if (sortBy === "rating") {
				const sortedMovies = [...movieData].sort(
					(a, b) => b.vote_average - a.vote_average
				);
				setMovieData(sortedMovies);
			} else if (sortBy === "release") {
				const sortedMovies = [...movieData].sort((a, b) => {
					return (
						new Date(b.release_date).getTime() -
						new Date(a.release_date).getTime()
					);
				});
				setMovieData(sortedMovies);
			} else {
				setMovieData(defaultState);
			}
		},
		[movieData, defaultState]
	);

	return {
		movieData,
		setMovieData,
		fetchMovies,
		handleLoadMore,
		setNextPage,
		handleSortByChange,
	};
}
