import React from "react";

type Props = {
  title?: string;
  className?: string;
};

const Header: React.FC<Props> = ({ title, children, className }) => {
  return (
    <header className={className}>
      <br className="medium" />
      <div
        className="flex container align-items-center"
        style={{ minHeight: 37 }}
      >
        <h1 style={{ lineHeight: 1 }}>{title}</h1>
        {children}
      </div>
      <br className="medium" />
      <hr className="bg-gray" />
    </header>
  );
};

export default Header;
