import { useEffect, useState } from "react";
import "./App.css";
import MovieList from "./components/movie-list";
import SearchBar from "./components/search-bar";
import SortBy from "./components/sort-by";

export default function App() {
	const [movieData, setMovieData] = useState([]);
	const [pagesLoaded, setPagesLoaded] = useState(1);
	const [defaultState, setDefaultState] = useState([]);
	const [searchInput, setSearchInput] = useState("");

	useEffect(() => {
		(async () => {
			try {
				const accessToken = import.meta.env.VITE_IMDB_ACCESS_TOKEN;
				const response = await fetch(
					"https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
					{
						method: "GET",
						headers: {
							accept: "application/json",
							Authorization: `Bearer ${accessToken}`,
						},
					}
				);

				const data = await response.json();

				setMovieData(data.results);
				setDefaultState(data.results);
			} catch (error) {
				console.error(error);
			}
		})();
	}, []);

	const handleLoadMore = () => {
		(async () => {
			try {
				const accessToken = import.meta.env.VITE_IMDB_ACCESS_TOKEN;
				setPagesLoaded(pagesLoaded + 1);
				const response = await fetch(
					`https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${pagesLoaded}`,
					{
						method: "GET",
						headers: {
							accept: "application/json",
							Authorization: `Bearer ${accessToken}`,
						},
					}
				);

				const data = await response.json();

				setMovieData([...movieData, ...data.results]);
				setDefaultState([...movieData, ...data.results]);
			} catch (error) {
				console.error(error);
			}
		})();
	};

	const handleSortByChange = (event) => {
		const sortBy = event.target.value;
		console.log(defaultState);

		if (sortBy == "title") {
			const sortedMovies = [...movieData].sort((a, b) =>
				a.title.localeCompare(b.title)
			);
			setMovieData(sortedMovies);
		} else if (sortBy == "rating") {
			const sortedMovies = [...movieData].sort(
				(a, b) => b.vote_average - a.vote_average
			);
			setMovieData(sortedMovies);
		} else if (sortBy == "release") {
			const referenceDate = new Date("2025-04-04");
			const sortedMovies = [...movieData].sort((a, b) => {
				const diffA = Math.abs(
					new Date(a.release_date) - referenceDate
				);
				const diffB = Math.abs(
					new Date(b.release_date) - referenceDate
				);
				return diffA - diffB;
			});
			setMovieData(sortedMovies);
		} else {
			setMovieData(defaultState);
		}
	};

	const handleSearchSubmit = () => {
		(async () => {
			try {
				const accessToken = import.meta.env.VITE_IMDB_ACCESS_TOKEN;
				setPagesLoaded(1);
				const formattedSearchInput = searchInput.split(" ").join("+");
				const response = await fetch(
					`https://api.themoviedb.org/3/search/movie?query=${formattedSearchInput}`,
					{
						method: "GET",
						headers: {
							accept: "application/json",
							Authorization: `Bearer ${accessToken}`,
						},
					}
				);

				const data = await response.json();

				setMovieData(data.results);
				setDefaultState(data.results);
			} catch (error) {
				console.error(error);
			}
		})();
	};

	return (
		<div className="app">
			<header className="app-header">
				<div>
					<h1>🎥 Flixster 🎬</h1>
				</div>
				<div className="search-container">
					<SearchBar
						handleSubmit={handleSearchSubmit}
						searchInput={searchInput}
						setSearchInput={setSearchInput}
					/>
					<SortBy handleSortByChange={handleSortByChange} />
				</div>
			</header>
			<main>
				<MovieList movieData={movieData} />
				<button onClick={handleLoadMore}>Load More</button>
			</main>
		</div>
	);
}
