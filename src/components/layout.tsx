import React from "react";
import Categories from "./categories";
import { Footer } from "./footer";
import { Gear } from "./gear";
import { Header } from "./header";

interface IProps {
  children: React.ReactNode;
  hideCategories?: boolean;
}

export const Layout: React.FC<IProps> = ({ children, hideCategories }) => {
  return (
    <>
      <Header />
      <main id="main">
        {children}
        {!hideCategories && <Categories />}
        <Gear />
      </main>
      <Footer />
    </>
  );
};
