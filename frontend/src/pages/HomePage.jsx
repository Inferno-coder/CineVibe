import React from "react";
import HeroSection from "../components/HeroSection";
import TrendingMovies from "../components/TrendingMovies";
import UpcomingMovies from "../components/UpcomingMovies";

const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <TrendingMovies />
      <UpcomingMovies />
    </div>
  );
};

export default HomePage;
