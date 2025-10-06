import React from "react";
import Header from "../Component/Common/Header";

const BaseLayout = ({ children }) => {
  return (
    <>
    <Header />
      <div className="bg-zinc-100/70 dark:bg-zinc-900 dark:text-white text-black">{children}</div>
    </>
  );
};

export default BaseLayout;
