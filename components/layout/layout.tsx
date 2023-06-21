import React from "react";
import Footer from "./footer/footer";
import Header from "./header/header";
import style from "./layout.module.scss";
export default function Layout({ children }: React.PropsWithChildren<{}>) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
