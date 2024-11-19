// RawgContext.js
import React, { createContext, useState, useContext, useEffect } from "react";
import {
  fetchGames,
  fetchGenres,
  fetchManyGames,
  fetchPlatforms,
} from "../../Services/RawgServices";
import Preloader from "../../layout/preloader";

const RawgContext = createContext();

export const RawgProvider = ({ children }) => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getAllGames = async () => {
      setLoading(true);
      const allGames = await fetchManyGames();
      setGames(allGames);
      setLoading(false);
    };
    getAllGames();
  }, []);
  if (loading)
    return (
      <div id="mainpreloader">
        <Preloader />
      </div>
    );
  return (
    <RawgContext.Provider
      value={{ games, fetchGames: fetchManyGames, fetchGenres, fetchPlatforms }}
    >
      {children}
    </RawgContext.Provider>
  );
};

export const useRawg = () => useContext(RawgContext);
