import React from "react";
import "./InfoCard.css";

/**
 * Props:
 * - title: string
 * - text: string
 * - icon: ReactNode (e.g., <i className="fa-solid fa-bolt" /> or an <svg />)
 * - onClick?: () => void
 * - href?: string (optional; if provided, card becomes a link)
 */
const InfoCard = ({ title, text, icon, onClick, href }) => {
  const Content = (
    <div className="info-card">
      <div className="info-card__icon">{icon}
        {/* <div className="info-card-color"></div> */}
      </div>
      <div className="info-card__body">
        <h3 className="info-card__title">{title}</h3>
        <p className="info-card__text">{text}</p>
      </div>
    </div>
  );

  // If href is provided, wrap with an anchor; else use a button if onClick exists
  if (href) {
    return (
      <a className="info-card__linkwrap" href={href} rel="noreferrer">
        {Content}
      </a>
    );
  }

  if (onClick) {
    return (
      <button className="info-card__buttonwrap" onClick={onClick}>
        {Content}
      </button>
    );
  }

  return Content;
};

export default InfoCard;
