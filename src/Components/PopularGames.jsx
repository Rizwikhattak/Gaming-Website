import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { fetchPopularGames } from "../Services/RawgServices"; // Add this function to fetch popular games
import Navbar from "../layout/Navbar";
import Footer from "../section-pages/footer";

const PopularGames = () => {
  const [popularGames, setPopularGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGames = async () => {
      const games = await fetchPopularGames();
      setPopularGames(games);
      setLoading(false);
    };
    fetchGames();
  }, []);

  if (loading) {
    return <p className="text-center mt-5">Loading Popular Games...</p>;
  }

  return (
    <div className="home dark-scheme">
      <header id="header-wrap">
        <Navbar />
      </header>
      <div className="container mt-5">
        <h2 className="text-center mb-4 text-light">Popular Games</h2>
        <div className="row g-4">
          {popularGames.map((game) => (
            <div
              className="col-lg-3 col-md-6"
              key={game.id}
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
                  src={game.background_image || "./img/placeholder.png"}
                  className="card-img-top"
                  alt={game.name}
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
                    {game.name}
                  </h5>
                  <p className="card-text">
                    <span
                      style={{
                        fontWeight: "bold",
                        color: "#f1c40f",
                      }}
                    >
                      Release Date:
                    </span>{" "}
                    {game.released || "TBA"}
                  </p>
                  <p className="card-text">
                    <span
                      style={{
                        fontWeight: "bold",
                        color: "#f1c40f",
                      }}
                    >
                      Rating:
                    </span>{" "}
                    {game.rating ? `${game.rating}/5` : "N/A"}
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
                    onClick={() => navigate(`/game/${game.id}`)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PopularGames;
