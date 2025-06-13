import { useCallback, useState } from "react";
import "./App.css";
import MovieList from "./components/movie-list";
import SearchBar from "./components/search-bar";
import Sidebar from "./components/sidebar";
import SortBy from "./components/sort-by";
import { useMovieData } from "./hooks/use-movie-data";
import { useSearch } from "./hooks/use-search";

export default function App() {
	const {
		movieData,
		handleLoadMore,
		setNextPage,
		fetchMovies,
		setMovieData,
		handleSortByChange,
	} = useMovieData();

	const { searchInput, setSearchInput, handleSearchSubmit } = useSearch(
		setNextPage,
		setMovieData
	);
	
	const [curPage, setCurPage] = useState("home");
	const [toggleSidebar, setToggleSidebar] = useState(false);

	const handleClear = useCallback(() => {
		setSearchInput("");
		document.getElementById("sort-by-select").value = "default";
		fetchMovies(1);
		setNextPage(2);
	}, [setNextPage, fetchMovies, setSearchInput]);

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
					className="toggle-sidebar"
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
