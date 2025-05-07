import React from "react";

const Header = ({ title }) => {
  return (
    <header className="box__header bg-black">
      <h1>
        <a href="/">{title}</a>
      </h1>
    </header>
  );
};

export default Header;
