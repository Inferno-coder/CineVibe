import React from "react";
import HeroSection from "../components/HeroSection";
import TrendingMovies from "../components/TrendingMovies";
import UpcomingMovies from "../components/UpcomingMovies";
import Footer from "../components/Footer";

const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <TrendingMovies />
      <UpcomingMovies />
      <Footer />
    </div>
  );
};

export default HomePage;
