import { useEffect, useState } from "react";
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
			const data = await movieApi.getPage(
				`https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${page}`
			);

			const enrichedResults = data.results.map((movie) => ({
				...movie,
				liked: false,
				watched: false,
			}));

			if (append) {
				setMovieData((prev) => [...prev, ...enrichedResults]);
				setDefaultState((prev) => [...prev, ...enrichedResults]);
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

	const handleSortByChange = (event) => {
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
	};

	return {
		movieData,
		setMovieData,
		fetchMovies,
		handleLoadMore,
		setNextPage,
		handleSortByChange,
	};
}
