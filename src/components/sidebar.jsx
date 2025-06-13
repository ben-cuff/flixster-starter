import propTypes from "prop-types";
import "./sidebar.css";

export default function Sidebar({
	toggleSidebar,
	curPage,
	handleSidebarClick,
}) {
	return (
		<aside
			className={`app-sidebar ${
				toggleSidebar ? "app-sidebar-on" : "app-sidebar-off"
			}`}
		>
			<nav>
				<span
					onClick={() => {
						handleSidebarClick("home");
					}}
					style={{
						textDecoration:
							curPage === "home" ? "underline" : "none",
					}}
				>
					Home
				</span>
				<span
					onClick={() => {
						handleSidebarClick("watched");
					}}
					style={{
						textDecoration:
							curPage === "watched" ? "underline" : "none",
					}}
					className=""
				>
					Watched
				</span>
				<span
					onClick={() => {
						handleSidebarClick("liked");
					}}
					style={{
						textDecoration:
							curPage === "liked" ? "underline" : "none",
					}}
				>
					Liked
				</span>
			</nav>
		</aside>
	);
}

Sidebar.propTypes = {
	toggleSidebar: propTypes.bool.isRequired,
	curPage: propTypes.string.isRequired,
	handleSidebarClick: propTypes.func.isRequired,
};
