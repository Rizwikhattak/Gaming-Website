import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Home from "../src/pages/home";

import { fetchRawgData } from "./Services/RawgServices";
import { RawgProvider } from "./Store/Context/RawgContext";
import GameCards from "./Components/GameCards";
import GameDetails from "./pages/GameDetails";
import UpcomingGames from "./Components/UpcomingGames";
import TopRatedGames from "./Components/TopRatedGames";
import PopularGames from "./Components/PopularGames";
import About from "./pages/about";
import ContactUs from "./pages/contact";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const routes = [
  { path: "/games", element: <GameCards /> },
  { path: "/game/:id", element: <GameDetails /> },
  { path: "/upcoming", element: <UpcomingGames /> },
  { path: "/top-rated", element: <TopRatedGames /> },
  { path: "/popular-games", element: <PopularGames /> },
  { path: "/about", element: <About /> },
  { path: "/contact", element: <ContactUs /> },
  { path: "/", element: <Home /> },
];

const Navigation = () => (
  <Routes>
    {routes.map(({ path, element }) => (
      <Route key={path} path={path} element={element} />
    ))}
  </Routes>
);

function App() {
  const getRawgData = async () => {
    const data = await fetchRawgData();
    return data;
  };
  useEffect(() => {
    getRawgData();
  }, []);
  return (
    <HelmetProvider>
      <RawgProvider>
        <div>
          <BrowserRouter>
            <ScrollToTop />
            <Navigation />
          </BrowserRouter>
        </div>
      </RawgProvider>
    </HelmetProvider>
  );
}

export default App;
