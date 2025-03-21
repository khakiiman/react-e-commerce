import React from "react";
import HeroHome from "../components/home/HeroHome";
import Newsletter from "../components/home/Newsletter";

const Home: React.FC = () => {
  return (
    <main>
      <HeroHome />
      <Newsletter />
    </main>
  );
};

export default Home; 