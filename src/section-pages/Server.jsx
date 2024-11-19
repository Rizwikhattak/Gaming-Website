import React from "react";
import { Link } from "react-router-dom";

const server = () => {
  return (
    <div className="container">
      <div className="row align-items-center gx-5">
        <div className="col-lg-6">
          <img
            width="1000"
            height="600"
            src="./img/misc/server.webp"
            className="img-fluid mb-sm-30"
            alt=""
          />
        </div>

        <div className="col-lg-6">
          <div className="subtitle mb-3">Server Highlights</div>
          <h2 className="">
            <span className="text-gradient">100+</span> Popular Games Hosted
            Worldwide
          </h2>
          <p className="">
            Host servers for your favorite titles, including action-packed
            adventures, immersive RPGs, and competitive multiplayer games. Fully
            optimized for low latency and high performance.
          </p>

          <ul className="de-server">
            <li>Perfect for Games Like:</li>
            <li>Grand Theft Auto V</li>
            <li>The Witcher 3</li>
            <li>Cyberpunk 2077</li>
            <li>Elden Ring</li>
            <li>Overwatch</li>
            <li>CS:GO</li>
            <li>
              <Link to="/">View All Supported Games</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default server;
