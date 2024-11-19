import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import ReactImageLightbox from "react-image-lightbox"; // Install: npm install react-image-lightbox
import "react-image-lightbox/style.css"; // Lightbox styles
import Navbar from "../layout/Navbar";
import Footer from "../section-pages/footer";

const GameDetails = () => {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [screenshots, setScreenshots] = useState([]);
  const [relatedGames, setRelatedGames] = useState([]);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGameDetails = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_RAWG_BASE_URL}/games/${id}?key=${process.env.REACT_APP_RAWG_API_KEY}`
      );
      const data = await response.json();
      setGame(data);
    };

    const fetchScreenshots = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_RAWG_BASE_URL}/games/${id}/screenshots?key=${process.env.REACT_APP_RAWG_API_KEY}`
      );
      const data = await response.json();
      setScreenshots(data.results || []);
    };

    const fetchGamesByGenre = async (genreId) => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_RAWG_BASE_URL}/games?genres=${genreId}&key=${process.env.REACT_APP_RAWG_API_KEY}&page_size=10`
        );
        const data = await response.json();
        setRelatedGames(data.results);
      } catch (error) {
        console.error("Error fetching games by genre:", error);
      }
    };

    fetchGameDetails();
    fetchScreenshots();
    const genreId = game?.genres[0]?.id;
    genreId && fetchGamesByGenre(genreId);
  }, [id, game?.genres]);

  if (!game) return <p>Loading...</p>;

  return (
    <div className="home dark-scheme">
      {/* Navbar */}
      <header id="header-wrap">
        <Navbar />
      </header>

      {/* Hero Section */}
      <div
        className="hero-section text-center text-white position-relative"
        style={{
          backgroundImage: `url(${game.background_image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          padding: "250px 0px",
        }}
      >
        <div
          className="overlay"
          style={{ background: "rgba(0, 0, 0, 0.7)", padding: "20px" }}
        >
          <h1>{game.name}</h1>
          <p>
            {game.genres.map((genre) => (
              <span key={genre.id} className="badge bg-primary mx-1">
                {genre.name}
              </span>
            ))}
          </p>
          <p>
            <strong>Developers:</strong>{" "}
            {game.developers.map((dev) => dev.name).join(", ")}
          </p>
          <p>
            <strong>Publisher:</strong>{" "}
            {game.publishers.map((pub) => pub.name).join(", ")}
          </p>
        </div>
      </div>

      <div className="container mt-5 mb-5">
        {/* Stats Section */}
        <div className="stats-bar d-flex justify-content-around py-3 bg-dark text-white rounded mb-4">
          <div className="text-center">
            <h4>{game.metacritic || "N/A"}</h4>
            <p>Metacritic Score</p>
          </div>
          <div className="text-center">
            <h4>{game.rating || "N/A"}</h4>
            <p>User Rating</p>
          </div>
          <div className="text-center">
            <h4>{game.reviews_count || "N/A"}</h4>
            <p>Reviews</p>
          </div>
          <div className="text-center">
            <h4>{game.playtime || "N/A"} hrs</h4>
            <p>Average Playtime</p>
          </div>
        </div>

        {/* Game Details and Description */}
        <div className="row">
          <div className="col-md-8">
            <h4>About</h4>
            <p>{game.description_raw}</p>
          </div>
          <div className="col-md-4">
            <h4>Details</h4>
            <ul className="list-group">
              <li className="list-group-item">
                <strong>Release Date:</strong> {game.released}
              </li>
              <li className="list-group-item">
                <strong>Rating:</strong> {game.rating}/5
              </li>
              <li className="list-group-item">
                <strong>Metacritic:</strong> {game.metacritic}
              </li>
            </ul>
          </div>
        </div>

        <h4 className="mt-5">System Requirements</h4>
        <div className="row">
          <div className="col-md-6">
            <h5>Minimum Requirements</h5>
            <ul>
              {game.platforms[0]?.requirements?.minimum ? (
                game.platforms[0].requirements.minimum
                  .split("\n")
                  .map((req, idx) => <li key={idx}>{req}</li>)
              ) : (
                <p>No data available</p>
              )}
            </ul>
          </div>
          <div className="col-md-6">
            <h5>Recommended Requirements</h5>
            <ul>
              {game.platforms[0]?.requirements?.recommended ? (
                game.platforms[0].requirements.recommended
                  .split("\n")
                  .map((req, idx) => <li key={idx}>{req}</li>)
              ) : (
                <p>No data available</p>
              )}
            </ul>
          </div>
        </div>

        {/* Screenshots Section */}
        <h4 className="mt-4">Screenshots</h4>
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {screenshots.map((screenshot) => (
            <div className="col" key={screenshot.id}>
              <img
                src={screenshot.image}
                alt="Screenshot"
                className="img-fluid rounded shadow"
                onClick={() => {
                  setLightboxOpen(true);
                  setCurrentImage(screenshot.image);
                }}
              />
            </div>
          ))}
        </div>

        {/* Lightbox for Screenshots */}
        {lightboxOpen && (
          <ReactImageLightbox
            mainSrc={currentImage}
            onCloseRequest={() => setLightboxOpen(false)}
          />
        )}

        {/* Gameplay Trailer */}
        {game.clip && (
          <div className="trailer mt-5">
            <h4>Gameplay Trailer</h4>
            <video
              className="w-100 rounded shadow"
              controls
              src={game.clip.clip}
            ></video>
          </div>
        )}

        {/* Related Games Section */}
        <h4 className="mt-5 text-center">Related Games</h4>
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {relatedGames.map((relatedGame) => (
            <div
              className="col"
              key={relatedGame.id}
              style={{
                perspective: "1000px", // Creates a 3D effect
              }}
            >
              <div
                className="card h-100 shadow-lg border-0"
                style={{
                  transformStyle: "preserve-3d",
                  transition: "transform 0.5s",
                  borderRadius: "40px",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform =
                    "rotateY(10deg) scale(1.05)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "rotateY(0deg) scale(1)";
                }}
              >
                <img
                  src={relatedGame.background_image}
                  className="card-img-top"
                  alt={relatedGame.name}
                  style={{
                    height: "200px",
                    objectFit: "cover",
                    borderRadius: "15px 15px 0 0", // Smooth rounded corners
                  }}
                />
                <div
                  className="card-body text-center"
                  style={{
                    backgroundColor: "#1e1e2e",
                    color: "white",
                    borderRadius: "0 0 15px 15px",
                    boxShadow: "0px -3px 10px rgba(0, 0, 0, 0.5)",
                  }}
                >
                  <h5 className="card-title mb-3" style={{ fontWeight: "700" }}>
                    {relatedGame.name}
                  </h5>
                  <p className="card-text">
                    <span
                      style={{
                        fontWeight: "bold",
                        color: "#f1c40f",
                      }}
                    >
                      Rating:
                    </span>{" "}
                    {relatedGame.rating}/5
                  </p>
                  <button
                    className="btn btn-outline-primary mt-2"
                    style={{
                      borderRadius: "20px",
                      fontSize: "0.9rem",
                      padding: "8px 16px",
                      transition: "background 0.3s, transform 0.3s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "#3498db";
                      e.currentTarget.style.color = "white";
                      e.currentTarget.style.transform = "scale(1.1)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "transparent";
                      e.currentTarget.style.color = "#3498db";
                      e.currentTarget.style.transform = "scale(1)";
                    }}
                    onClick={() => navigate(`/game/${relatedGame.id}`)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* System Requirements Section */}
      </div>
      <Footer />
    </div>
  );
};

export default GameDetails;
