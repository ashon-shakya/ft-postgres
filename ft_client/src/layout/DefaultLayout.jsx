import React from "react";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";

const DefaultLayout = () => {
  return (
    <div>
      <div className="bg-dark d-flex flex-column vw-100 min-vh-100 justify-content-start align-items-center">
        <Header />
        <h1 className="text-white">FINANCIAL TRACKER</h1>

        <Outlet />
      </div>
    </div>
  );
};

export default DefaultLayout;
