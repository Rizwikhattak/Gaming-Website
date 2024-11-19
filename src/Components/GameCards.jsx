import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { useRawg } from "../Store/Context/RawgContext";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import Navbar from "../layout/Navbar";
import Footer from "../section-pages/footer";

// const GlobalStyles = createGlobalStyle`
//   .navbar-brand .imginit{
//       display: block ;
//     }
//     .navbar-brand .imgsaly{
//       display: none !important;
//     }
// `;

const GameCards = () => {
  const { games, fetchGames, fetchGenres, fetchPlatforms } = useRawg();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredGames, setFilteredGames] = useState([]);
  const [genres, setGenres] = useState([]);
  const [platforms, setPlatforms] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedPlatform, setSelectedPlatform] = useState("");

  const navigate = useNavigate();

  // Fetch all games, genres, and platforms
  useEffect(() => {
    fetchGames();
    fetchGenres().then(setGenres);
    fetchPlatforms().then(setPlatforms);
  }, [fetchGames, fetchGenres, fetchPlatforms]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const loader = document.getElementById("mainpreloader");
      if (loader)
        setTimeout(() => {
          loader.classList.add("fadeOut");
          loader.style.display = "none";
        }, 600);
    }
  }, []);

  // Filter games based on search query, genre, and platform
  useEffect(() => {
    let filtered = games;

    if (searchQuery) {
      filtered = filtered.filter((game) =>
        game.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedGenre) {
      filtered = filtered.filter((game) =>
        game.genres.some((genre) => genre.name === selectedGenre)
      );
    }

    if (selectedPlatform) {
      filtered = filtered.filter((game) =>
        game.platforms.some(
          (platform) => platform.platform.name === selectedPlatform
        )
      );
    }

    setFilteredGames(filtered);
  }, [searchQuery, selectedGenre, selectedPlatform, games]);

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;

    return (
      <>
        {Array(fullStars)
          .fill(0)
          .map((_, index) => (
            <FaStar key={`full-${index}`} color="gold" />
          ))}
        {halfStar ? <FaStarHalfAlt color="gold" /> : null}
        {Array(emptyStars)
          .fill(0)
          .map((_, index) => (
            <FaRegStar key={`empty-${index}`} color="gold" />
          ))}
      </>
    );
  };

  return (
    <div className="home dark-scheme">
      <header id="header-wrap">
        <Navbar />
      </header>

      {/* Filters and Search */}
      <div className="container mt-4">
        <div className="row mb-3">
          {/* Search Bar */}
          <div className="col-md-6 mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search games..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Genre Filter */}
          <div className="col-md-3 mb-3">
            <select
              className="form-select"
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
            >
              <option value="">All Genres</option>
              {genres.map((genre) => (
                <option key={genre.id} value={genre.name}>
                  {genre.name}
                </option>
              ))}
            </select>
          </div>

          {/* Platform Filter */}
          <div className="col-md-3 mb-3">
            <select
              className="form-select"
              value={selectedPlatform}
              onChange={(e) => setSelectedPlatform(e.target.value)}
            >
              <option value="">All Platforms</option>
              {platforms.map((platform) => (
                <option key={platform.id} value={platform.name}>
                  {platform.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Game Cards */}
      <div className="container Game__Cards mt-4">
        <h2 className="text-center mb-4">Popular PC Games</h2>
        <div className="row g-4">
          {filteredGames.map((game) => (
            <div
              className="col-lg-3 col-md-6 gallery-item"
              style={{ cursor: "pointer" }}
              key={game.id}
              onClick={() => navigate(`/game/${game.id}`)}
            >
              <div className="de-item wow position-relative shadow-sm">
                {/* Overlay Section */}
                <div className="d-overlay">
                  <div className="px-2 py-1">
                    {game.metacritic ? (
                      <p className="d-price">
                        <span className="price">{game.rating}</span>
                      </p>
                    ) : (
                      "New"
                    )}
                  </div>
                  <div className="d-text text-center">
                    <h4 className="text-white">{game.name}</h4>
                    <p className="text-white">
                      <strong>Genre:</strong>{" "}
                      {game.genres.map((genre) => genre.name).join(", ")}
                    </p>
                  </div>
                </div>

                {/* Game Image */}
                <img
                  src={game.background_image}
                  className="img-fluid rounded"
                  alt={game.name}
                  style={{ height: "250px", objectFit: "cover" }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default GameCards;
