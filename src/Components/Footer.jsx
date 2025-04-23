import React from "react";
import "../css/Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <p>
        &copy; {new Date().getFullYear()} FredFlix | Contact:{" "}
        <a href="mailto:fredrickighile@gmail.com" className="footer-email">
          fredrickighile@gmail.com
        </a>
      </p>
    </footer>
  );
}

export default Footer;
