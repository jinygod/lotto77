import React, { useState, useRef, useEffect } from "react";
import "./Header.css";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const menuButtonRef = useRef(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = (event) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(event.target) &&
      !menuButtonRef.current.contains(event.target)
    ) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", closeMenu);
    return () => document.removeEventListener("click", closeMenu);
  }, []);

  return (
    <div className="header-wrapper">
      <header className="header">
        <div className="logo">LOTTO77</div>
        <div
          className="hamburger-menu"
          onClick={toggleMenu}
          ref={menuButtonRef}
        >
          &#9776;
        </div>
        <nav className={`menu ${isMenuOpen ? "open" : ""}`} ref={menuRef}>
          <button className="close-button" onClick={toggleMenu}>
            &times;
          </button>
          <span>로또뽑기</span>
          <span>로또통계</span>
        </nav>
      </header>
    </div>
  );
};

export default Header;
