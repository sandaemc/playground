import React from "react";
import { Link } from "react-router-dom";

export function HeaderComponent() {
  return (
    <div className="container">
      <header className="blog-header py-3">
        <div className="row flex-nowrap justify-content-between align-items-center">
          <div className="col-4 pt-1"></div>
          <div className="col-4 text-center">
            <Link to="/" className="blog-header-logo text-dark">
              <small>DISTRACTED</small>
            </Link>
          </div>
          <div className="col-4 d-flex justify-content-end align-items-center"></div>
        </div>
      </header>
    </div>
  );
}
