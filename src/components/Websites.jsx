import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Websites = () => {
  const [isMobile, setIsMobile] = useState(false);

  // Detect window width
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const websiteData = [
    {
      image: "images/b1.png",
      link: "https://kerala.gov.in/",
      alt: "Government of Kerala"
    },
    {
      image: "images/b3.png",
      link: "https://sansad.in/ls",
      alt: "Lok Sabha"
    },
    {
      image: "images/b4.png",
      link: "https://rajyasabha.nic.in/",
      alt: "Rajya Sabha"
    },
    {
      image: "images/b5.png",
      link: "https://sansadtv.nic.in/live-tv",
      alt: "Sansad T V"
    },
    {
      image: "images/b6.png",
      link: "https://mpa.gov.in/",
      alt: "Ministry of Parliamentary Affairs"
    },
    {
      image: "images/b2.png",
      link: "https://www.india.gov.in/",
      alt: "India.gov.in"
    },
  ];

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="our-partners pt650 ">
      <div className="container mb20">
        {!isMobile ? (
          // Desktop View (Grid)
          <div className="row">
            {websiteData.map((item, i) => (
              <div className="col-6 col-md-4 col-xl-2" key={i}>
                <div className="partner_item text-center mb30-lg">
                  <a href={item.link} target="_blank" rel="noopener noreferrer">
                    <img className="wa m-auto" src={item.image} alt={item.alt} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Mobile View (Carousel)
          <Slider {...sliderSettings}>
            {websiteData.map((item, i) => (
              <div key={i} style={{ marginBottom: "60px" }}>
                <div className="text-center">
                  <a href={item.link} target="_blank" rel="noopener noreferrer">
                    <img
                      className="wa m-auto"
                      src={item.image}
                      alt={item.alt}
                      style={{ width: "80%" }}
                    />
                  </a>
                </div>
              </div>
            ))}
          </Slider>
        )}
      </div>
    </div>
  );
};

export default Websites;
