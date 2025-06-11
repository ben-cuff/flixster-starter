import propTypes from "prop-types";
import "./sidebar.css";

export default function Sidebar({
	toggleSidebar,
	curPage,
	setCurPage,
	setToggleSidebar,
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
						setCurPage("home");
						setToggleSidebar(!toggleSidebar);
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
						setCurPage("watched");
						setToggleSidebar(!toggleSidebar);
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
						setCurPage("liked");
						setToggleSidebar(!toggleSidebar);
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
	setCurPage: propTypes.func.isRequired,
	setToggleSidebar: propTypes.func.isRequired,
};
