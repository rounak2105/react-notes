import React from "react";
import flashLogo from "../assets/flash.svg"

type NavBarProps = {
  onBrandClick: () => void;
  onNavigate: (page: string) => void;
};

export const NavBar: React.FC<NavBarProps> = ({ onBrandClick, onNavigate }) => {
  return (
    <div>
      <nav className="navbar bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#" onClick={onBrandClick}>
            <img
              src={flashLogo}
              alt="Logo"
              width="30"
              height="24"
              className="d-inline-block align-text-top"
            />
            FlashNotes
          </a>
          <div className="d-flex" role="search">
            <button className="btn" onClick={() => onNavigate("about")}>
              About Us
            </button>
            <button className="btn" onClick={() => onNavigate("help")}>
              Help
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};
