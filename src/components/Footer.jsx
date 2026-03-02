import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faInstagram,
  faLinkedinIn,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import "../styles/Footer.css";
import { faAngleUp } from "@fortawesome/free-solid-svg-icons";
import ScrollToTop from "react-scroll-to-top";
import { useLocation } from "react-router-dom";

const Footer = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/" || location.pathname === "/home";
  
  return (
    <div>
      <section className="footer-style1 pt25 pb-0">
        <div className="container">
          <div className="row bb-white-light pb10 mb60">
            <div className="foot-head-container col-md-7 col-flex">
              <div className="d-block text-center text-md-start justify-content-center justify-content-md-start d-md-flex align-items-center mb-3 mb-md-0">
                <a className="foot-head fz17 fw500 text-white mr15-md mr30" href="https://sansad.in/ls" target="_blank" rel="noopener noreferrer">
                  Loksabha
                </a>
                <a className="foot-head fz17 fw500 text-white mr15-md mr30" href="https://rajyasabha.nic.in/" target="_blank" rel="noopener noreferrer">
                  Rajyasabha
                </a>
                <a className="foot-head fz17 fw500 text-white" href="https://www.legislative.gov.in/constitution-of-india" target="_blank" rel="noopener noreferrer">
                  Constitution of India
                </a>
              </div>
            </div>
       <div className="col-md-5">
              <div className="social-widget text-center text-md-end">
                <div className="footer-social-style">
                  <a href="https://www.facebook.com/KeralaLegislativeAssemblyOfficial" target="_blank" rel="noopener noreferrer" className="list-inline-items">
                    <FontAwesomeIcon
                      className="font-icon"
                      icon={faFacebookF}
                      height={15}
                      color="#fff"
                    />
                  </a>
                  <a href="https://twitter.com/kerala_assembly" target="_blank" rel="noopener noreferrer" className="list-inline-items">
                    <FontAwesomeIcon
                      className="font-icon"
                      icon={faXTwitter}
                      height={15}
                      color="#fff"
                    />
                  </a>
                  <a href="https://www.instagram.com/keralaniyamasabha" target="_blank" rel="noopener noreferrer" className="list-inline-items">
                    <FontAwesomeIcon
                      className="font-icon"
                      icon={faInstagram}
                      height={15}
                      color="#fff"
                    />
                  </a>
                  <a href="https://www.linkedin.com/company/kerala-legislative-assembly" target="_blank" rel="noopener noreferrer" className="list-inline-items">
                    <FontAwesomeIcon
                      className="font-icon"
                      icon={faLinkedinIn}
                      height={15}
                      color="#fff"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-6 col-lg-3">
              <div className="link-style1 mb-4 mb-sm-5">
                <div className="footer-logo mb-3">
                  <img src="/images/Component 641.svg" alt="Kerala Legislative Assembly" style={{ maxWidth: "200px", height: "auto" }} />
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-lg-3">
              <div className="link-style1 mb-4 mb-sm-5">
                <h5 className="footer-title text-white mb15">Useful Links</h5>
                <ul className="ps-0">
                  <li>
                    <a href="https://presidentofindia.nic.in/" target="_blank" rel="noopener noreferrer">President of India</a>
                  </li>
                  <li>
                    <a href="https://vicepresidentofindia.nic.in/" target="_blank" rel="noopener noreferrer">Vice President of India</a>
                  </li>
                  <li>
                    <a href="https://www.pmindia.gov.in/" target="_blank" rel="noopener noreferrer">Prime Minister of India</a>
                  </li>
                  {/* <li>
                    <a href="https://loksabhaspeaker.gov.in/" target="_blank" rel="noopener noreferrer">Speaker of Lok Sabha</a>
                  </li> */}
                  <li>
                    <a href="https://cm.kerala.gov.in/" target="_blank" rel="noopener noreferrer">Chief Minister of Kerala</a>
                  </li>
                  <li>
                    <a href="https://niyamasabha.nic.in/" target="_blank" rel="noopener noreferrer">Speaker of the Kerala Legislative Assembly</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-sm-6 col-lg-3">
              <div className="link-style1 mb-4 mb-sm-5">
                <h5 className="footer-title text-white mb15">Useful Links</h5>
                <ul className="ps-0">
                  {/* <li>
                    <a href="https://main.sci.gov.in/" target="_blank" rel="noopener noreferrer">Supreme Court of India</a>
                  </li> */}
                  <li>
                    <a href="https://hckerala.gov.in/" target="_blank" rel="noopener noreferrer">High Court of Kerala</a>
                  </li>
                   {/* <li>
                    <a href="https://rajbhavangoa.gov.in/" target="_blank" rel="noopener noreferrer">Governor of India</a>
                  </li> */}
                  <li>
                    <a href="https://governor.kerala.gov.in/" target="_blank" rel="noopener noreferrer">Governor of Kerala</a>
                  </li>
                  <li>
                    <a href="https://www.india.gov.in/" target="_blank" rel="noopener noreferrer">Government of India</a>
                  </li>
                  <li>
                    <a href="https://kerala.gov.in/" target="_blank" rel="noopener noreferrer">Government of Kerala</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-sm-6 col-lg-3">
              <div className="footer-widget">
                {/* <div className="footer-widget mb-4 mb-sm-5">
                  <div className="mailchimp-widget">
                    <h5 className="footer-title text-white mb20">Subscribe</h5>
                    <div className="mailchimp-style1">
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Your email address"
                      />
                      <button type="submit">Send</button>
                    </div>
                  </div>
                </div> */}
                <div className="app-widget mb-4 mb-sm-5">
                  <h5 className="footer-title text-white mb20">Apps</h5>
                  <div className="row mb-4 mb-lg-5">
                    <div className="col-lg-12">
                      <a
                        className="app-list d-flex align-items-center mb10"
                        href="https://play.google.com/store/apps/details?id=com.eniyamasabha.kla"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img 
                          src="/images/e-niyamasabha.webp" 
                          alt="E Niyamasabha App Icon" 
                          style={{ width: '24px', height: '24px', marginRight: '10px', verticalAlign: 'middle' }}
                        />
                        <h6 className="app-title fz15 fw400 mb-0">E Niyamasabha App</h6>
                      </a>
                     
                    </div>
                  </div>
                </div>
                    <div className="app-widget mb-4 mb-sm-5">
                  <h5 className="footer-title text-white mb20">Old Website</h5>
                  <div className="row mb-4 mb-lg-5">
                    <div className="col-lg-12">
                      <a
                        className="app-list d-flex align-items-center mb10"
                        href="http://niyamasabha.org/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {/* <img 
                          src="/images/e-niyamasabha.webp" 
                          alt="E Niyamasabha App Icon" 
                          style={{ width: '24px', height: '24px', marginRight: '10px', verticalAlign: 'middle' }}
                        /> */}
                        <h6 className="app-title fz15 fw400 mb-0">http://niyamasabha.org/</h6>
                      </a>
                     
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container white-bdrt1 py-3">
          <div className="row align-items-center">
            <div className="col-md-12">
              <div className="text-center">
                <p className="copyright-text mb-2 mb-md-0 text-white-light ff-heading">
                  © Copyright 2026 | Designed By <span>C-Dit</span>. All Rights
                  Reserved

                  {/* © Copyright 2026 | Developed by C-Dit. All Rights Reserved */}
                </p>
              </div>
            </div>
          </div>
          {isHomePage && (
            <a 
              className="sabha" 
              href="https://youtube.com/@sabhatv-kla?si=bJkkS_4SyaU2BeZo" 
              target="_blank" 
              rel="noopener noreferrer"
              title="Watch Sabha TV on YouTube"
            >
              <img src="images/tvq.webp" alt="Sabha TV" />
            </a>
          )}
          <a className="scrollToHomepage" href="#">
            <ScrollToTop
              smooth
              style={{
                backgroundColor: "rgba(34, 34, 34, 0.05)", // greenish circle
                borderRadius: "50%",
                border: "1px solid rgba(34, 34, 34, 0.05)",
                width: "50px",
                height: "50px",
                boxShadow: "none",
              }}
              component={
                <FontAwesomeIcon
                  icon={faAngleUp}
                  style={{ width: 15, height: 15 }}
                  alt="Go to top"
                />
              }
            />
          </a>
        </div>
      </section>
    </div>
  );
};

export default Footer;
