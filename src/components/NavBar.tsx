import React from "react";

type NavBarProps = {
  onBrandClick: () => void;
};

export const NavBar : React.FC<NavBarProps> = ({ onBrandClick })  => {
  return (
    <div>
      <nav className="navbar bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#" onClick={onBrandClick}>
            <img
              src="/src/assets/flash.svg"
              alt="Logo"
              width="30"
              height="24"
              className="d-inline-block align-text-top"
            ></img>
            FlashNotes
          </a>
          <div className="d-flex" role="search">
            <button className="btn" type="submit">
              About Us
            </button>
            <button className="btn" type="submit">
              Help
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};
