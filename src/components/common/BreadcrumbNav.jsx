import React from "react";

const BreadcrumbNav = ({ 
  breadcrumbs = [], 
  className = "breadcumb-section" 
}) => {
  return (
    <section className={className}>
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="breadcumb-style1">
              <div className="breadcumb-list">
                {breadcrumbs.map((breadcrumb, index) => (
                  <a key={index} href={breadcrumb.href || "#"}>
                    {breadcrumb.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BreadcrumbNav;
