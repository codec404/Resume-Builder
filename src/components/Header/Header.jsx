import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <>
      <div className="header-container">
        <div className="header-left">
          <p className="header-heading">
            A <span>Resume</span> that stands out!
          </p>
          <p className="header-heading">
            Make your own resume. <span>It's free</span>
          </p>
        </div>
        <div className="header-right">
          <img src="/assets/images/heading.svg" alt="Logo" />
        </div>
      </div>
    </>
  );
};

export default Header;
