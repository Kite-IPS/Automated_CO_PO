import React from "react";
import Header from "../Component/Common/Header";

const BaseLayout = ({ children }) => {
  return (
    <>
    <Header />
      <div>{children}</div>
    </>
  );
};

export default BaseLayout;
