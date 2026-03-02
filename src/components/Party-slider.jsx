import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { fetchStatisticalAnalysis } from "../api/services/all.service";

// Reusable PartyCard Component
const PartyCard = ({ code, count, name }) => (
  <div className="iconbox-styles text-center bdr1 default-box-shadow1 p0">
    <a href="#">
      <p>{code}</p>
      <div className="details">
        <div className="funfact_one at-home5-hero me-2 me-sm-0">
          <ul className="p-0">
            <li>
              <div className="timer">{count}</div>
            </li>
          </ul>
        </div>
        <h5 className="title">{name}</h5>
      </div>
    </a>
  </div>
);

// Custom Arrows
const CustomPrevArrow = ({ onClick }) => (
  <div className="party-custom-arrows-prev" onClick={onClick}>
    <FontAwesomeIcon icon={faArrowLeft} width={25} height={25} color="black" />
  </div>
);

const CustomNextArrow = ({ onClick }) => (
  <div className="party-custom-arrows-next" onClick={onClick}>
    <FontAwesomeIcon icon={faArrowRight} width={25} height={25} color="black" />
  </div>
);

// Function to generate party code from name
const generatePartyCode = (partyName) => {
  // Handle special cases
  const specialCases = {
    "Communist Party Of India (Marxist)": "CPI(M)",
    "Indian National Congress": "INC",
    "Communist Party Of India": "CPI",
    "Indian Union Muslim League": "IUML",
    "Kerala Congress (M)": "KC(M)",
    "Independents": "IND",
    "Independent": "IND",
    "Nationalist Congress Party": "NCP",
    "Janata Dal (Secular)": "JD(S)",
    "Kerala Congress": "KC",
    "National Secular Conference": "NSC",
    "Congress (Secular)": "C(S)",
    "Kerala Congress (Jacob)": "KC(J)",
    "Revolutionary Marxist Part Of India": "RMPI",
    "Loktantrik Janta Dal": "LJD",
    "Kerala Congress (B)": "KC(B)",
    "Janadhipathya Kerala Congress": "JKC",
    "Indian National League": "INL",
  };

  if (specialCases[partyName]) {
    return specialCases[partyName];
  }

  // Extract first letters of significant words
  const words = partyName.split(' ');
  const significantWords = words.filter(word => 
    !['of', 'the', 'and', 'in', 'a', 'an'].includes(word.toLowerCase())
  );
  
  if (significantWords.length >= 2) {
    return significantWords.slice(0, 3).map(w => w[0].toUpperCase()).join('');
  }
  
  return partyName.substring(0, 3).toUpperCase();
};

// Group cards into chunks of 3 for each slide
const groupIntoSlides = (data, itemsPerSlide = 3) => {
  const slides = [];
  for (let i = 0; i < data.length; i += itemsPerSlide) {
    slides.push(data.slice(i, i + itemsPerSlide));
  }
  return slides;
};

const SimpleSlider = () => {
  const [partyData, setPartyData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStatisticalData = async () => {
      try {
        setLoading(true);
        const data = await fetchStatisticalAnalysis();
        
        // Transform API data to match component structure
        const transformedData = data.map(party => ({
          code: generatePartyCode(party.name_of_party),
          count: party.number_of_seats,
          name: party.name_of_party,
        }));
        
        setPartyData(transformedData);
      } catch (error) {
        console.error("Error loading statistical analysis:", error);
      } finally {
        setLoading(false);
      }
    };

    loadStatisticalData();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    autoplay: false,
    arrows: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    responsive: [
      { breakpoint: 1440, settings: { slidesToShow: 5 } },
      { breakpoint: 1024, settings: { slidesToShow: 4 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 820, settings: { slidesToShow: 3 } },
      { breakpoint: 480, settings: { slidesToShow: 2 } },
    ],
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <p>Loading party data...</p>
      </div>
    );
  }

  const slides = groupIntoSlides(partyData);

  return (
    <Slider {...settings} style={{ display: "flex !important", gap: "10px" }}>
      {slides.map((group, index) => (
        <div className="item Partycounter" key={index}>
          {group.map((party, idx) => (
            <PartyCard key={idx} {...party} />
          ))}
        </div>
      ))}
    </Slider>
  );
};

export default SimpleSlider;
