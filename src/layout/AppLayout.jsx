import Header from "@/components/Header";
import React from "react";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div className="pl-1 pr-1">
      <div className="grid-background"></div>
      <main className="min-h-screen container m-auto">
        <Header />
        <Outlet />
      </main>
      <footer className="text-center p-10 mt-10 bg-gray-800">
        This made by ABDUL MOIZ GHANI
      </footer>
    </div>
  );
};

export default AppLayout;
