import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchSliderGames } from "../Services/RawgServices";
import Preloader from "../layout/preloader";

const Slider = () => {
  const [popularGames, setPopularGames] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getPopularGames = async () => {
      setLoading(true);
      try {
        const games = await fetchSliderGames();
        console.log("Fetched games:", games);

        if (games) {
          setPopularGames(games);
        } else {
          console.error("Invalid API response format:", games);
        }
      } catch (error) {
        console.error("Error fetching popular games:", error);
      } finally {
        setLoading(false);
      }
    };

    getPopularGames();
  }, []);

  if (loading) {
    return (
      <div id="mainpreloader">
        <Preloader />
      </div>
    );
  }

  return (
    <Swiper
      className="mainslider"
      modules={[Navigation, Pagination, Autoplay]}
      spaceBetween={50}
      slidesPerView={1}
      loop={true}
      navigation
      autoplay={{ delay: 4000 }}
      pagination={{
        clickable: false,
        renderBullet: function (index, className) {
          return `<span class="${className}">${
            index + 1
          } <span className="swiper-pagination-current">/ 4</span></span>`;
        },
      }}
    >
      {popularGames.length > 0 ? (
        popularGames.map((game, index) => (
          <SwiperSlide key={index}>
            <div
              className="swiper-inner"
              style={{
                backgroundImage: `url(${
                  game.background_image || "./img/default-slider-bg.jpg"
                })`,
                width: "100%",
                height: "100%",
              }}
            >
              <div className="sw-caption">
                <div className="container">
                  <div className="row gx-5 align-items-center">
                    <div className="col-lg-8 mb-sm-30">
                      <div
                        className="subtitle blink mb-4"
                        style={{
                          background:
                            "linear-gradient(90deg, #5a00e0, #9d00ff)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                        }}
                      >
                        Game Spotlight
                      </div>
                      <h1
                        className="slider-title text-uppercase mb-1"
                        style={{
                          background:
                            "linear-gradient(90deg, #5a00e0, #9d00ff)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                        }}
                      >
                        {game.name || "Unknown Game"}
                      </h1>
                    </div>
                    <div className="col-lg-6">
                      <p
                        className="slider-text"
                        style={{
                          background:
                            "linear-gradient(90deg, #5a00e0, #9d00ff)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                        }}
                      >
                        {game.released
                          ? `Released: ${game.released}`
                          : "Release date unavailable"}
                      </p>
                      <div className="sw-price wp">
                        <div
                          className="d-starting"
                          style={{
                            background:
                              "linear-gradient(90deg, #5a00e0, #9d00ff)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                          }}
                        >
                          Ratings:{" "}
                          <span className="d-cur">
                            {game.metacritic ? game.rating : "N/A"}
                          </span>
                          <span className="d-period">/5</span>
                        </div>
                        <div
                          className="d-price"
                          style={{
                            background:
                              "linear-gradient(90deg, #5a00e0, #9d00ff)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                          }}
                        ></div>
                      </div>
                      <div className="spacer-10"></div>
                      <Link className="btn-main mb10" to={`/game/${game.id}`}>
                        View Game Details
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="sw-overlay"></div>
            </div>
          </SwiperSlide>
        ))
      ) : (
        <SwiperSlide>
          <div className="swiper-inner">
            <h2 className="text-center text-white">No Games Found</h2>
          </div>
        </SwiperSlide>
      )}
    </Swiper>
  );
};

export default Slider;
