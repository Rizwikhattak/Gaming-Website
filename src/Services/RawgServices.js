const rawgKey = process.env.REACT_APP_RAWG_API_KEY;
const rawgBaseUrl = process.env.REACT_APP_RAWG_BASE_URL;

export const fetchRawgData = async () => {
  try {
    const response = await fetch(`${rawgBaseUrl}/games?key=${rawgKey}`);
    if (!response.ok) {
      throw new Error("Failed to fetch the data");
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (e) {
    console.error(e);
  }
};

export const fetchSliderGames = async () => {
  try {
    const response = await fetch(
      `${rawgBaseUrl}/games?key=${rawgKey}&page=1&page_size=4&platforms=4`
    );
    const data = await response.json();
    return data.results; // Returns an array of games
  } catch (error) {
    console.error("Error fetching popular games:", error);
    return [];
  }
};

export const fetchTopGames = async () => {
  try {
    const response = await fetch(
      `${rawgBaseUrl}/games?key=${rawgKey}&page=1&page_size=8&ordering=-added&metacritic=70,100&platforms=4,18,1`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch top games");
    }
    const data = await response.json();
    return data.results; // Returns an array of top 8 games
  } catch (error) {
    console.error("Error fetching top games:", error);
    return [];
  }
};

export const fetchGames = async () => {
  const response = await fetch(
    `${rawgBaseUrl}/games?key=${rawgKey}&platforms=4&page_size=50`
  );
  const data = await response.json();
  return data.results;
};

export const fetchManyGames = async () => {
  const allGames = [];
  const totalPages = 5; // Number of pages to fetch
  const pageSize = 50; // Games per page

  try {
    for (let page = 1; page <= totalPages; page++) {
      const response = await fetch(
        `${rawgBaseUrl}/games?key=${rawgKey}&platforms=4&page_size=${pageSize}&page=${page}`
      );
      if (!response.ok) {
        throw new Error(`Failed to fetch page ${page}`);
      }
      const data = await response.json();
      allGames.push(...data.results); // Add the results to the allGames array
    }
    return allGames; // Return the aggregated results
  } catch (error) {
    console.error("Error fetching many games:", error);
    return [];
  }
};

export const fetchGenres = async () => {
  try {
    const response = await fetch(`${rawgBaseUrl}/genres?key=${rawgKey}`);
    const data = await response.json();
    return data.results; // Array of genres
  } catch (error) {
    console.error("Error fetching genres:", error);
    return [];
  }
};

export const fetchPlatforms = async () => {
  try {
    const response = await fetch(`${rawgBaseUrl}/platforms?key=${rawgKey}`);
    const data = await response.json();
    return data.results; // Array of platforms
  } catch (error) {
    console.error("Error fetching platforms:", error);
    return [];
  }
};

export const fetchUpcomingGames = async () => {
  try {
    const today = new Date().toISOString().split("T")[0]; // Current date in YYYY-MM-DD
    const futureDate = "2025-12-31"; // Arbitrary future date for fetching upcoming games

    const response = await fetch(
      `${process.env.REACT_APP_RAWG_BASE_URL}/games?key=${process.env.REACT_APP_RAWG_API_KEY}&dates=${today},${futureDate}&ordering=released`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch upcoming games");
    }

    const data = await response.json();
    return data.results; // Returns an array of games
  } catch (error) {
    console.error("Error fetching upcoming games:", error);
    return [];
  }
};

export const fetchTopRatedGames = async () => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_RAWG_BASE_URL}/games?key=${process.env.REACT_APP_RAWG_API_KEY}&ordering=-rating&page_size=20`
    );
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching top-rated games:", error);
    return [];
  }
};

export const fetchPopularGames = async () => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_RAWG_BASE_URL}/games?key=${process.env.REACT_APP_RAWG_API_KEY}&ordering=-rating&page_size=20`
    );
    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error("Error fetching popular games:", error);
    return [];
  }
};
