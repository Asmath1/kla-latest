import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const slidesData = [
  {
    title: "Beautiful Kerala",
    subtitle: "Beautiful Kerala",
    description: "Kerala Legislative Assembly cultural art featuring Kathakali and traditions.",
    image: "/images/muralImg.png",
    bg: "/images/muralImg.png",
  },
  {
    title: "Wayanad Forest",
    subtitle: "Wayanad Forest View",
    description: "Wayanad is famous for its hills, lakes, and forests.",
    image: "/images/wayanad-4769648_1280.jpg",
    bg: "/images/wayanad-4769648_1280.jpg",
  },
  {
    title: "Kerala Kathakali",
    subtitle: "Kerala Kathakali",
    description: "Traditional art form of Kerala performed in temple festivals.",
    image: "/images/kadhakali.png",
    bg: "/images/kadhakali.png",
  },
  {
    title: "Tea Plantations",
    subtitle: "Munnar Tea Plantations",
    description: "Scenic beauty of Kerala's tea gardens and hill stations.",
    image: "/images/tea-6405249_1280.jpg",
    bg: "/images/tea-6405249_1280.jpg",
  },
];

export const SliderWithGsap = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const mainImageRef = useRef(null);
  const progressRef = useRef(null);
  const underlineProgressRef = useRef(null);
  const timerRef = useRef(null);
  const cardsListRef = useRef(null);

  const fadeBackground = (newImage) => {
    gsap.timeline()
      .to(mainImageRef.current, {
        opacity: 0, 
        scale: 1.05,
        duration: 0.5,
        ease: "power1.inOut",
        onComplete: () => {
          mainImageRef.current.style.backgroundImage = `url(${newImage})`;
        },
      })
      .to(mainImageRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: "power2.out",
      });
  };

  const resetProgressBars = () => {
    gsap.killTweensOf(progressRef.current);
    gsap.fromTo(progressRef.current, { width: "0%" }, { width: "100%", duration: 4, ease: "linear" });

    const percentage = ((activeIndex + 1) / slidesData.length) * 100;
    gsap.to(underlineProgressRef.current, {
      width: `${percentage}%`,
      duration: 0.5,
      ease: "power1.out",
    });
  };

  const animateCards = () => {
    const cardsWidth = 170;
    gsap.to(cardsListRef.current, {
      x: `-${activeIndex * cardsWidth}`,
      duration: 0.6,
      ease: "power2.inOut",
      onComplete: () => {
        if (activeIndex === slidesData.length) {
          gsap.set(cardsListRef.current, { x: 0 });
          setActiveIndex(0);
        }
      },
    });
  };

  const autoNext = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % (slidesData.length + 1));
    }, 4000);
  };

  useEffect(() => {
    fadeBackground(slidesData[activeIndex % slidesData.length].bg);
    gsap.fromTo(
      ".main-content > *",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, stagger: 0.2, duration: 0.6, ease: "power2.out" }
    );
    resetProgressBars();
    animateCards();
    autoNext();
    return () => clearInterval(timerRef.current);
  }, [activeIndex]);

  const handleCardClick = (index) => {
    setActiveIndex(index);
    resetProgressBars();
    autoNext();
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % (slidesData.length + 1));
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + slidesData.length) % slidesData.length);
  };

  return (
    <div className="slider-container">
      <div className="progress-bar-container">
        <div ref={progressRef} className="progress-bar"></div>
      </div>

      <div className="main-image" ref={mainImageRef}>
        <div className="overlay"></div>
        <div className="main-content">
          <h1>{slidesData[activeIndex % slidesData.length].title}</h1>
          <h4>{slidesData[activeIndex % slidesData.length].subtitle}</h4>
          <p>{slidesData[activeIndex % slidesData.length].description}</p>
        </div>
      </div>

      <div className="cards-slider">
        <div ref={cardsListRef} className="cards-list">
          {[...slidesData, slidesData[0]].map((slide, index) => (
            <div
              key={index}
              className={`card ${(activeIndex % slidesData.length) === index ? "active" : ""}`}
              onClick={() => handleCardClick(index % slidesData.length)}
            >
              <img src={slide.image} alt={slide.title} />
              <h3>{slide.title}</h3>
            </div>
          ))}
        </div>

        <div className="underline-container">
          <div className="nav-buttons">
            <button className="custom-previouss" onClick={handlePrev}>←</button>
            <button className="custom-nextt" onClick={handleNext}>→</button>
          </div>
          <div className="underline-track">
            <div ref={underlineProgressRef} className="underline-progress"></div>
            <div className="slide-count">
              {(activeIndex % slidesData.length) + 1} / {slidesData.length}
            </div>
          </div>
        </div>
      </div>
            <style jsx>{`
        .slider-container {
          position: relative;
          height: 100vh;
          background: #111;
          overflow: hidden;
        }
        .main-content h1 {
          color: white;
        }
        .main-content h4 {
          color: burlywood;
        }
        .progress-bar-container {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 3px;
          background: rgba(255, 255, 255, 0.2);
          z-index: 50;
        }
        .progress-bar {
          height: 100%;
          background-color: yellow;
          width: 0%;
        }
        .main-image {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
          z-index: 0;
        }
        .overlay {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.4);
          z-index: 1;
        }
        .main-content {
          position: absolute;
          top: 20%;
          left: 10%;
          color: #fff;
          z-index: 2;
        }
        .main-content h1 {
          font-size: 3rem;
          margin-bottom: 0.5rem;
        }
        .main-content h4 {
          font-weight: 300;
          margin-bottom: 1rem;
        }
        .main-content p {
          width: 300px;
          line-height: 1.5;
          color: #ddd;
        }
        .cards-slider {
          position: absolute;
          bottom: 10%;
          right: 5%;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          z-index: 2;
          width: 520px;
          overflow: hidden;
        }
        .cards-list {
          display: flex;
          flex-direction: row;
          gap: 10px;
          align-items: flex-end;
          transition: transform 0.6s ease;
        }
        .card {
          background: rgba(255, 255, 255, 0.95);
          border-radius: 12px;
          overflow: hidden;
          cursor: pointer;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
          width: 160px;
          flex-shrink: 0;
          transition: transform 0.3s;
        }
        .card:hover {
          transform: scale(1.05);
        }
        .card.active {
          transform: scale(1.15);
          z-index: 5;
        }
        .card img {
          width: 100%;
          height: 200px;
          object-fit: cover;
          display: block;
        }
        .card h3 {
          padding: 10px;
          font-size: 0.9rem;
          color: #333;
          text-align: center;
        }
        .underline-container {
          display: flex;
          align-items: center;
          width: 100%;
          justify-content: flex-end;
          position: relative;
          z-index: 10;
          margin-top: 35px;
        }
        .nav-buttons {
          display: flex;
          gap: 10px;
          margin-right: 20px;
          position: relative;
          z-index: 5;
        }
        .nav-buttons button {
          border: 2px solid #fff;
          color: #fff;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: transparent;
          font-size: 1.5rem;
          cursor: pointer;
          transition: all 0.3s;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .nav-buttons button:hover {
          background: #fff;
          color: #000;
        }
        .underline-track {
          width: 80%;
          height: 2px;
          background: rgba(255, 255, 255, 0.2);
          position: relative;
        }
        .underline-progress {
          position: absolute;
          top: 0;
          left: 0;
          height: 2px;
          background-color: yellow;
          width: 0%;
        }
        .slide-count {
          position: absolute;
          right: 0;
          bottom: -20px;
          color: white;
          font-size: 0.9rem;
        }
      `}</style>
    </div>
  );
};


