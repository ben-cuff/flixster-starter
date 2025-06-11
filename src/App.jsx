import { useEffect, useState } from "react";
import "./App.css";
import MovieList from "./components/movie-list";
import SearchBar from "./components/search-bar";
import Sidebar from "./components/sidebar";
import SortBy from "./components/sort-by";

export default function App() {
	const [movieData, setMovieData] = useState([]);
	const [pagesLoaded, setPagesLoaded] = useState(2);
	const [defaultState, setDefaultState] = useState([]);
	const [searchInput, setSearchInput] = useState("");
	const [curPage, setCurPage] = useState("home");
	const [toggleSidebar, setToggleSidebar] = useState(false);

	useEffect(() => {
		fetchMovies(1);
	}, []);

	const handleLoadMore = () => {
		fetchMovies(pagesLoaded, true);
		const nextPage = pagesLoaded + 1;
		setPagesLoaded(nextPage);
	};

	const fetchMovies = async (page, append = false) => {
		try {
			const accessToken = import.meta.env.VITE_IMDB_ACCESS_TOKEN;
			const response = await fetch(
				`https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${page}`,
				{
					method: "GET",
					headers: {
						accept: "application/json",
						Authorization: `Bearer ${accessToken}`,
					},
				}
			);

			const data = await response.json();

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

	const handleSortByChange = (event) => {
		const sortBy = event.target.value;

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

	const handleClear = () => {
		setSearchInput("");
		document.getElementById("sort-by-select").value = "default";
		fetchMovies(1);
		setPagesLoaded(2);
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
						handleClear={handleClear}
					/>
					<SortBy handleSortByChange={handleSortByChange} />
				</div>
				<div
					onClick={() => {
						setToggleSidebar(!toggleSidebar);
					}}
					style={{ marginRight: "auto", fontSize: "30px" }}
				>
					{toggleSidebar ? "x" : "☰"}
				</div>
			</header>
			<Sidebar
				toggleSidebar={toggleSidebar}
				curPage={curPage}
				setToggleSidebar={setToggleSidebar}
				setCurPage={setCurPage}
			/>
			<main>
				<MovieList
					curPage={curPage}
					movieData={movieData}
					setMovieData={setMovieData}
				/>
				<button onClick={handleLoadMore}>Load More</button>
			</main>
			<footer className="app-footer"></footer>
		</div>
	);
}
