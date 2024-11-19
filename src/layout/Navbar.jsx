import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import {
  FaHome,
  FaGamepad,
  FaStar,
  FaInfoCircle,
  FaPhoneAlt,
} from "react-icons/fa"; // React Icons

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const header = document.getElementById("header-wrap");
      if (header) {
        if (window.scrollY > 50) {
          header.classList.add("sticky");
        } else {
          header.classList.remove("sticky");
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="navbar custom-navbar transition">
      <div className="container d-flex justify-content-between align-items-center">
        {/* Logo */}
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img src="/img/logo.png" className="img-fluid logo" alt="logo" />
        </Link>

        {/* Menu */}
        <div className={`menu ${showMenu ? "show" : ""}`}>
          <ul className="navbar-nav nav_menu_items">
            {/* Home */}
            <li className="nav-item">
              <Link
                to="/"
                onClick={() => setShowMenu(false)}
                className="nav-link"
              >
                <FaHome className="me-2" /> Home
              </Link>
            </li>

            {/* Explore Games */}
            <li className="nav-item dropdown nav__item__dropdown">
              <span className="nav-link dropdown-toggle">
                <FaGamepad className="me-2" /> Explore Games
              </span>
              <ul className="dropdown-menu dropdown-menu__items">
                <li>
                  <Link
                    to="/top-rated"
                    className="dropdown-item"
                    onClick={() => setShowMenu(false)}
                  >
                    <FaStar className="me-2" /> Top-Rated Games
                  </Link>
                </li>
                <li>
                  <Link
                    to="/games"
                    className="dropdown-item"
                    onClick={() => setShowMenu(false)}
                  >
                    <FaGamepad className="me-2" /> Browse by Genre
                  </Link>
                </li>
              </ul>
            </li>

            {/* Upcoming Games */}
            <li className="nav-item">
              <Link
                to="/upcoming"
                onClick={() => setShowMenu(false)}
                className="nav-link"
              >
                <FaStar className="me-2" /> Upcoming Games
              </Link>
            </li>

            {/* About */}
            <li className="nav-item">
              <Link
                to="/about"
                onClick={() => setShowMenu(false)}
                className="nav-link"
              >
                <FaInfoCircle className="me-2" /> About
              </Link>
            </li>

            {/* Contact */}
            <li className="nav-item">
              <Link
                to="/contact"
                onClick={() => setShowMenu(false)}
                className="nav-link"
              >
                <FaPhoneAlt className="me-2" /> Contact
              </Link>
            </li>
          </ul>
        </div>
        {/* Mobile Menu Toggle */}
        {/* <button
          className="burger-menu btn btn-outline-light"
          onClick={() => setShowMenu(!showMenu)}
        >
          <i className="fa fa-bars"></i>
        </button> */}
      </div>
    </nav>
  );
};

export default Navbar;
