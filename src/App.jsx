import { useEffect, useState } from "react";
import "./App.css";
import MovieList from "./components/movie-list";
import SearchBar from "./components/search-bar";
import SortBy from "./components/sort-by";
import data from "./data/data";

export default function App() {
	const [movieData, setMovieData] = useState([]);
	const [pagesLoaded, setPagesLoaded] = useState(1);

	useEffect(() => {
		(async () => {
			try {
				const accessToken = import.meta.env.VITE_IMDB_ACCESS_TOKEN;

				await fetch(
					"https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
					{
						method: "GET",
						headers: {
							accept: "application/json",
							Authorization: `Bearer ${accessToken}`,
						},
					}
				)
					.then(async (res) => await res.json())
					.catch((err) => console.error(err));

				setMovieData(data.results);
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
					<SearchBar />
					<SortBy />
				</div>
			</header>
			<main>
				<MovieList movieData={movieData} />
				<button onClick={handleLoadMore}>Load More</button>
			</main>
		</div>
	);
}
