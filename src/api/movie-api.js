export const movieApi = {
	searchMovies: async (query) => {
		const accessToken = import.meta.env.VITE_IMDB_ACCESS_TOKEN;
		const response = await fetch(
			`https://api.themoviedb.org/3/search/movie?query=${query}`,
			{
				method: "GET",
				headers: {
					accept: "application/json",
					Authorization: `Bearer ${accessToken}`,
				},
			}
		);

		const data = await response.json();
		return data;
	},
	getPage: async (query) => {
		const accessToken = import.meta.env.VITE_IMDB_ACCESS_TOKEN;
		const response = await fetch(
			`https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${query}`,
			{
				method: "GET",
				headers: {
					accept: "application/json",
					Authorization: `Bearer ${accessToken}`,
				},
			}
		);

		const data = await response.json();
		return data;
	},
	getMovieDetails: async (movieId) => {
		const accessToken = import.meta.env.VITE_IMDB_ACCESS_TOKEN;
		const response = await fetch(
			`https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
			{
				method: "GET",
				headers: {
					accept: "application/json",
					Authorization: `Bearer ${accessToken}`,
				},
			}
		);

		const data = await response.json();
		return data;
	},
	getMovieVideos: async (movieId) => {
		const accessToken = import.meta.env.VITE_IMDB_ACCESS_TOKEN;
		const response = await fetch(
			`https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
			{
				method: "GET",
				headers: {
					accept: "application/json",
					Authorization: `Bearer ${accessToken}`,
				},
			}
		);

		const data = await response.json();
		return data;
	},
};
