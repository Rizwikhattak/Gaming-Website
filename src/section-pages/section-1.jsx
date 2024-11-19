import React from "react";
import {
  FaGamepad,
  FaTrophy,
  FaDesktop,
  FaEye,
  FaInfinity,
  FaUsers,
} from "react-icons/fa";

const Section = () => {
  const cardStyle = {
    background: "linear-gradient(135deg, #5a00e0, #9d00ff)",
    color: "white",
    height: "300px",
    borderRadius: "10px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
    padding: "20px",
  };

  return (
    <div className="container mt-5">
      {/* Section Header */}
      <div className="text-center mb-5">
        <div className="subtitle mb-3">Incredible Features</div>
        <h2 className="mb20">Top Game Highlights</h2>
      </div>

      {/* Cards Grid */}
      <div className="row g-4">
        {/* Feature 1: Immersive Gameplay */}
        <div className="col-lg-4 col-md-6">
          <div style={cardStyle}>
            <FaGamepad size={50} className="mb-3" />
            <h4 className="mb-2">Immersive Gameplay</h4>
            <p className="text-center">
              Engage in breathtaking adventures with dynamic missions and
              challenges.
            </p>
          </div>
        </div>

        {/* Feature 2: High Metacritic Ratings */}
        <div className="col-lg-4 col-md-6">
          <div style={cardStyle}>
            <FaTrophy size={50} className="mb-3" />
            <h4 className="mb-2">High Metacritic Ratings</h4>
            <p className="text-center">
              Enjoy critically acclaimed games loved by gamers worldwide with
              outstanding Metacritic scores.
            </p>
          </div>
        </div>

        {/* Feature 3: Wide Platform Compatibility */}
        <div className="col-lg-4 col-md-6">
          <div style={cardStyle}>
            <FaDesktop size={50} className="mb-3" />
            <h4 className="mb-2">Wide Platform Compatibility</h4>
            <p className="text-center">
              Play your favorite games on multiple platforms like PC,
              PlayStation, and Xbox.
            </p>
          </div>
        </div>

        {/* Feature 4: Visually Stunning Graphics */}
        <div className="col-lg-4 col-md-6">
          <div style={cardStyle}>
            <FaEye size={50} className="mb-3" />
            <h4 className="mb-2">Visually Stunning Graphics</h4>
            <p className="text-center">
              Experience stunning visuals and cutting-edge graphics in every
              game.
            </p>
          </div>
        </div>

        {/* Feature 5: Endless Entertainment */}
        <div className="col-lg-4 col-md-6">
          <div style={cardStyle}>
            <FaInfinity size={50} className="mb-3" />
            <h4 className="mb-2">Endless Entertainment</h4>
            <p className="text-center">
              Explore various genres, modes, and replayable games that keep you
              entertained for hours.
            </p>
          </div>
        </div>

        {/* Feature 6: Community Experience */}
        <div className="col-lg-4 col-md-6">
          <div style={cardStyle}>
            <FaUsers size={50} className="mb-3" />
            <h4 className="mb-2">Community Experience</h4>
            <p className="text-center">
              Collaborate and compete with a vibrant community of gamers
              worldwide.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section;
