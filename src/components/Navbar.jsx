"use client";

import { useEffect, useState, useRef } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faInstagram,
  faLinkedinIn,
  faYoutube,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import "../styles/Navbar.css";

const TopMenu = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { language, setLanguage } = useLanguage();

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }

    function handleScroll() {
      setOpen(false); // close dropdown on scroll
    }

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", handleScroll); // scroll listener added

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll); // clean up scroll listener
    };
  }, []);

  return (
    <div className="top-menu">
      <div className="container">
        <div className="toplft">
          <img src="/images/flag.svg" alt="" />
          <span>Government Of India</span>
        </div>
        <div className="topryt">
          <ul className="topryt-ul">
            <li className="d-none d-md-block skip">Skip to main content</li>
            <li className="d-none d-md-block soc">
            <div className="social-style1">
                <a href="https://www.facebook.com/KeralaLegislativeAssemblyOfficial" target="_blank" rel="noopener noreferrer" className="list-inline-items">
                  <FontAwesomeIcon icon={faFacebookF} height={15} />
                </a>
                <a href="https://twitter.com/kerala_assembly" target="_blank" rel="noopener noreferrer" className="list-inline-items">
                  <FontAwesomeIcon icon={faXTwitter} height={15} />
                </a>
                <a href="https://www.instagram.com/keralaniyamasabha" target="_blank" rel="noopener noreferrer" className="list-inline-items">
                  <FontAwesomeIcon icon={faInstagram} height={15} />
                </a>
                <a href="https://www.linkedin.com/company/kerala-legislative-assembly" target="_blank" rel="noopener noreferrer" className="list-inline-items">
                  <FontAwesomeIcon icon={faLinkedinIn} height={15} />
                </a>
                <a href="https://www.youtube.com/channel/UCpzchw7KJfQcCXOAqJsu4jw" target="_blank" rel="noopener noreferrer" className="list-inline-items">
                  <FontAwesomeIcon icon={faYoutube} height={15} />
                </a>
              </div>
            </li>
            <li className="langs">
              <div className="dropdown" ref={dropdownRef}>
                <button
                  className={`btn dropdown-toggle language-btn ${
                    open ? "active" : ""
                  }`}
                  type="button"
                  onClick={() => setOpen(!open)}
                >
                  {language === "malayalam" ? "മലയാളം" : "English"}
                </button>
                {open && (
                  <ul className="dropdown-menu">
                    <li>
                      <a
                        className="dropdown-item"
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          setLanguage("malayalam");
                          setOpen(false);
                        }}
                      >
                        മലയാളം
                      </a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item"
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          setLanguage("english");
                          setOpen(false);
                        }}
                      >
                        English
                      </a>
                    </li>
                  </ul>
                )}
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TopMenu;
