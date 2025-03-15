import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import ProductsHeader from "../components/ProductsHeader";

function Layout() {
  return (
    <>
      <ProductsHeader />
      <main className="wrapper">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default Layout;
