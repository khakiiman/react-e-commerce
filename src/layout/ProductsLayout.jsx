import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";

function ProductsLayout() {
  return (
    <>
      <Outlet />
      <Footer />
    </>
  );
}

export default ProductsLayout; 