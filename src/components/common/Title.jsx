import React from 'react';

const SectionTitle = ({ 
  title,
  subtitle,
  className = "row align-items-center wow fadeInUp p-0",
  titleClass = "main-title mb10",
  titleTextClass = "title"
}) => {
  return (
    <div className={className}>
      <div className={titleClass}>
        <h2 className={titleTextClass}>{title}</h2>
        {subtitle && <p className="subtitle">{subtitle}</p>}
      </div>
    </div>
  );
};

export default SectionTitle;
