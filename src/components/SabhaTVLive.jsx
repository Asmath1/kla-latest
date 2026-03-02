import React, { useState, useEffect } from "react";
import {
  BreadcrumbNav,
  CategoriesNav,
  SectionTitle,
} from "./common";
import HomeTest from "./Header";
import "../secretariate/Secretariat.css";

const SabhaTVLive = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="wrapper ovh">
      <header
        className={`header-nav nav-homepage-style2 stricky main-menu ${
          isScrolled ? "scrolled-nav slideInDown animated" : "slideIn animated"
        }`}
      >
        <HomeTest />
      </header>

      <div className="body_content">
        <CategoriesNav />
        <BreadcrumbNav
          breadcrumbs={[
            { name: "Home", href: "/" },
            { name: "Sabha TV Live", href: "/sabha-tv-live" },
          ]}
        />

        <section className="Bussiness-schedule quest pt20 pb-0 pb30-md represent">
          <div className="container">
            <SectionTitle title="Sabha TV Live" />

            <div className="sabha-tv-live-container" style={{ marginTop: "30px" }}>
              {/* Live Video Section */}
              <div className="live-video-wrapper" style={{ 
                display: "flex", 
                justifyContent: "center", 
                marginBottom: "40px" 
              }}>
                <div className="video-container" style={{ 
                  width: "100%", 
                  maxWidth: "1000px",
                  position: "relative",
                  paddingBottom: "45%", // Reduced height (was 56.25% for 16:9)
                  height: 0,
                  overflow: "hidden",
                  borderRadius: "8px",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)"
                }}>
                  <iframe
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      border: "none",
                      borderRadius: "8px"
                    }}
                    src="https://www.youtube.com/embed/LI3Emu7cJxs?si=O472k9rLbVXIO8Wz&autoplay=1&mute=1"
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>

              {/* Go to Sabha TV Button */}
              <div className="text-center" style={{ marginBottom: "50px" }}>
                <a
                  href="https://youtube.com/@sabhatv-kla?si=RqQtGxwE2LLF-Vbs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ud-btn btn-thm"
                  style={{
                    padding: "15px 40px",
                    fontSize: "16px",
                    fontWeight: "500",
                    textDecoration: "none"
                  }}
                >
                  Go to Sabha TV
                  <i className="fal fa-arrow-right-long" style={{ marginLeft: "10px" }}></i>
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SabhaTVLive;
