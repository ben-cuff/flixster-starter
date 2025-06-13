import { useCallback, useState } from "react";

export default function useSidebar() {
	const [curPage, setCurPage] = useState("home");
	const [toggleSidebar, setToggleSidebar] = useState(false);

	const handleSidebarClick = useCallback(
		(page) => {
			setCurPage(page);
			setToggleSidebar(!toggleSidebar);
		},
		[toggleSidebar]
	);

	return {
		curPage,
		setCurPage,
		toggleSidebar,
		setToggleSidebar,
		handleSidebarClick,
	};
}
