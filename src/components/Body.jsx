import React, { useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../styles/Body.css";
import { API_ENDPOINTS } from "../utils/config";

const BannerCarousel = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [bannerData, setBannerData] = useState(null);
  const sliderRef = useRef(null);

  useEffect(() => {
    const fetchBannerData = async () => {
      try {
        const response = await fetch(API_ENDPOINTS.BANNER_LIST, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          }
        });
        const data = await response.json();
        
        if (data?.banner_section) {
          setBannerData(data.banner_section);
        }
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching banner data:", error);
        // Fallback to default data if API fails
        // setBannerData({
        //   enabled: true,
        //   slides: [
        //     {
        //       id: 1,
        //       type: "video",
        //       source: "images/bannervideo.mp4",
        //       alt: "Banner Video",
        //       title: "Banner Video"
        //     },
        //     {
        //       id: 2,
        //       type: "image",
        //       source: "images/Niyamasabha_Mandiram.JPG",
        //       alt: "Banner Image",
        //       title: "Banner Image"
        //     }
        //   ],
        //   content: {
        //     title: {
        //       malayalam: "കേരള നിയമസഭ",
        //       english: "Kerala Legislative Assembly"
        //     },
        //     description: {
        //       malayalam: "കേരള നിയമസഭയുടെ ഔദ്യോഗിക വെബ്‌സൈറ്റിലേക്ക് സ്വാഗതം",
        //       english: "Welcome to Kerala Legislative Assembly official website"
        //     }
        //   }
        // });
        setIsLoading(false);
      }
    };

    fetchBannerData();
  }, []);

  const goToVideoSlide = () => {
    if (sliderRef.current) {
      sliderRef.current.slickGoTo(0);
    }
  };

  const settings = {
    dots: false,
    infinite: true,
    autoplay: false,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
    vertical: true,
    verticalSwiping: true,
    arrows: true,
    prevArrow: <CustomPrevArrow onClick={goToVideoSlide} />,
    nextArrow: <CustomNextArrow onClick={goToVideoSlide} />,
  };

  // Helper function to determine if source is video
  const isVideoSource = (source) => {
    return source?.toLowerCase().endsWith('.mp4') || 
           source?.toLowerCase().endsWith('.webm') || 
           source?.toLowerCase().endsWith('.ogg');
  };

  if (!bannerData || !bannerData.enabled) {
    return null;
  }

  return (
    <div className="home-one p-0 space-maintain-1">
      <div className="container-fluid px-0">
        <div className="row">
          <div className="col-lg-12">
            <div className="main-banner-wrapper home1_style">
              {isLoading ? (
                <div className="loading-screen">
                  <div className="spinner"></div>
                </div>
              ) : (
                <Slider
                  {...settings}
                  className="banner-carousel"
                  ref={sliderRef}
                >
                  {bannerData.slides?.map((slide) => (
                    <div key={slide.id} className="slide" style={{ position: "relative" }}>
                      {isVideoSource(slide.source) ? (
                        <>
                          <video
                            autoPlay
                            muted
                            onLoadedData={() => setIsLoading(false)}
                          >
                            <source src={slide.source} type="video/mp4" />
                            Your browser does not support the video tag.
                          </video>
                          <div className="overlay"></div>
                        </>
                      ) : (
                        <><img
                            src={slide.source}
                            alt={slide.alt || "Banner"}
                            className="slide slide-one"
                            style={{ position: "relative" }} /><div className="overlay"></div></>
                      )}
                    </div>
                  ))}
                </Slider>
              )}
            </div>
          </div>
        </div>
      </div>

      {!isLoading && bannerData.content && (
        <div className="home1-banner-content">
          <div className="container">
            <div className="row">
              <div className="col-xl-12 col-xxl-12">
                <div className="position-relative">
                  <h1 className="banner-title">
                    {bannerData.content.title?.malayalam || "കേരള നിയമസഭ"} 
                    <br className="d-md-block" />
                  </h1>

                  <p className="bannerSub d-none d-md-block">
                    {bannerData.content.description?.malayalam || 
                      "കേരള നിയമസഭയുടെ ഔദ്യോഗിക വെബ്‌സൈറ്റായ 'Niyamasabha.org'-ലേക്ക് സ്വാഗതം. 1888 മുതലുള്ള ആർക്കൈവുകൾ, സഭാ നടപടികളുടെ ദൈനംദിന അജണ്ട, സംഗ്രഹം, അനുബന്ധ വാർത്തകൾ, ഔദ്യോഗിക പത്രക്കുറിപ്പുകൾ എന്നിവയുൾപ്പെടെ കേരള നിയമസഭയുടെ എല്ലാ വശങ്ങളെയും കുറിച്ചുള്ള വിവരങ്ങൾക്ക് ഈ സമഗ്രമായ സൈറ്റിൽ ലോഗിൻ ചെയ്യുക. 'Niyamasabha.org' വഴി നിങ്ങൾക്ക് സഭാംഗങ്ങളെ ബന്ധപ്പെടാനും നിയമസഭയുടെ ഓൺലൈൻ ടെലിഫോൺ ഡയറക്ടറി ആക്‌സസ് ചെയ്യാനും കഴിയും."
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const CustomPrevArrow = ({ onClick }) => (
  <button className="custom-prev" onClick={onClick}>
    <img src="/images/back.png" alt="Previous" />
  </button>
);

const CustomNextArrow = ({ onClick }) => (
  <button className="custom-next" onClick={onClick}>
    <img src="/images/next.png" alt="Next" />
  </button>
);

export default BannerCarousel;
