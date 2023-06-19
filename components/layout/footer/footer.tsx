import React from "react";
import style from "./footer.module.scss";
export default function Footer() {
  return (
    <footer className={style.footer}>
      <a
        href="https://github.com/AndyT2503/next-conduit"
        target="_blank"
      >
        <i className="fa-brands fa-github me-2"></i>Fork on Github
      </a>
    </footer>
  );
}
