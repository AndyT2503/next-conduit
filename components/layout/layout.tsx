import React from "react";
import Footer from "./footer/footer";
import Header from "./header/header";
export default function Layout({ children }: React.PropsWithChildren<unknown>) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
