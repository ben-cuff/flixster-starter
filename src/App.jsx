import "./App.css";
import SearchBar from "./components/search-bar";
import SortBy from "./components/sort-by";

export default function App() {
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
		</div>
	);
}
