import React from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import { useAuth } from "../hooks/use-auth";

interface HeaderComponentProps extends RouteComponentProps {}

export function HeaderComponent({ location }: HeaderComponentProps) {
  const auth = useAuth();

  function getLogoutLink() {
    return (
      <a
        className="btn btn-sm btn-outline-secondary"
        onClick={() => auth.signOut()}
      >
        Log out
      </a>
    );
  }

  function getLoginLink() {
    const link = (
      <Link to="/login" className="btn btn-sm btn-outline-secondary">
        Log in
      </Link>
    );

    return location.pathname === "/login" ? null : link;
  }

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
          <div className="col-4 d-flex justify-content-end align-items-center">
            {auth.user ? getLogoutLink() : getLoginLink()}
          </div>
        </div>
      </header>
    </div>
  );
}
