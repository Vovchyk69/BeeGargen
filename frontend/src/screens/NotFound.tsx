import React from "react";

export type NotFoundProps = {};

const NotFound: React.FC<NotFoundProps> = () => {
  return (
    <div className="not-found page flex flex-align-center flex-justify-center">
      <h1 style={{ color: "red", fontSize: 60 }}>404</h1>
    </div>
  );
};

export default NotFound;
