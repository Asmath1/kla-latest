import React, { useEffect, useState } from "react";
import HomeTest from "./Header";
import Calendar from "./Calendar";
import BannerCarousel from "./Body";
import Latest from "./Latest";
import Websites from "./Websites";
import MapNew from "./MapNew";

const Home = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="home-page-main">
      <header
        className={`header-nav nav-homepage-style stricky main-menu ${
          isScrolled ? "scrolled-nav slideInDown animated" : "slideIn animated"
        }`}
      >
        <HomeTest />
      </header>
      <BannerCarousel />
      <Latest />
      <Calendar />
      <MapNew />
      <Websites />
    </div>
  );
};

export default Home;
