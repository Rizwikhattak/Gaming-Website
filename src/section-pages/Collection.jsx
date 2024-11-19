import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { useRawg } from "../Store/Context/RawgContext";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa"; // Import React Icons
import { fetchTopGames } from "../Services/RawgServices";
import Preloader from "../layout/preloader";

const Collection = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getTopGames = async () => {
      setLoading(true);
      try {
        const topGames = await fetchTopGames();
        if (topGames) {
          console.log(topGames);
          setGames(topGames);
        }
      } catch (e) {
        console.error("Error", e);
      } finally {
        setLoading(false);
      }
    };
    getTopGames();
  }, []);

  //   const renderStars = (rating) => {
  //     const fullStars = Math.floor(rating);
  //     const halfStar = rating % 1 >= 0.5 ? 1 : 0;
  //     const emptyStars = 5 - fullStars - halfStar;

  //     return (
  //       <>
  //         {Array(fullStars)
  //           .fill(0)
  //           .map((_, index) => (
  //             <FaStar key={`full-${index}`} color="gold" />
  //           ))}
  //         {halfStar ? <FaStarHalfAlt color="gold" /> : null}
  //         {Array(emptyStars)
  //           .fill(0)
  //           .map((_, index) => (
  //             <FaRegStar key={`empty-${index}`} color="gold" />
  //           ))}
  //       </>
  //     );
  //   };

  if (loading)
    return (
      <div id="mainpreloader">
        <Preloader />
      </div>
    );

  return (
    <div className="container Game__Cards mt-5">
      <div className="row">
        <div className="col-md-6">
          <div className="subtitle mb20">Most Liked</div>
          <h2 className="wow fadeInUp">Game Collection</h2>
          <div className="spacer-20"></div>
        </div>
        <div className="col-lg-6 text-lg-end">
          <Link className="btn-main mb-sm-30" to="/games">
            View all games
          </Link>
        </div>
      </div>
      <div className="row g-4">
        {games.map((game) => (
          <div
            className="col-lg-3 col-md-6  gallery-item"
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
  );
};

export default Collection;
