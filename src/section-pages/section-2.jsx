import React from "react";
import { Parallax } from "react-parallax";
import { Link } from "react-router-dom";

const image1 = "./img/background/1.webp";

const Section = () => {
  return (
    <div className="container position-relative">
      <div className="row">
        <div className="col-lg-12">
          <Parallax className="p-0" bgImage={image1} strength={300}>
            <div className="padding60 sm-padding40 sm-p-2 position-relative">
              <div className="row z-1">
                <div className="col-lg-6">
                  <div className="subtitle mb-3">Futuristic Adventure</div>
                  <h2 className="wow fadeInUp" data-wow-delay=".2s">
                    Step Into the World of{" "}
                    <span style={{ color: "#9d00ff" }}>Cyber Warrior X</span>
                  </h2>
                  <p className="wow fadeInUp">
                    In a dystopian future, take on the role of a cyber-enhanced
                    warrior tasked with saving humanity from the rise of rogue
                    AI. Experience breathtaking action, state-of-the-art combat,
                    and an immersive world brought to life with cutting-edge
                    graphics.
                  </p>
                  <div className="spacer-10"></div>
                  <Link className="btn-main mb10" to="/">
                    Begin Your Mission
                  </Link>
                </div>
              </div>
            </div>
          </Parallax>
          <img
            src="./img/misc/avatar.webp"
            className="sm-hide position-absolute avatar px-2"
            alt="Cyber Warrior X"
          />
        </div>
      </div>
    </div>
  );
};

export default Section;
