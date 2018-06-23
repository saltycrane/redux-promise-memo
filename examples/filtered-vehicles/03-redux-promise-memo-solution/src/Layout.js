import React from "react";
import { Link } from "react-router-dom";

const Layout = ({ children }) => (
  <div style={styles.container}>
    <div style={styles.header}>
      <Link style={styles.link} to="/">
        Filtered Vehicles Example (w/ redux-promise-memo)
      </Link>
      <Link style={styles.link} to="/vehicles">
        Vehicles
      </Link>
    </div>
    <div style={styles.content}>{children}</div>
  </div>
);

export default Layout;

const styles = {
  container: {
    fontFamily: "sans-serif",
    fontWeight: 300,
  },
  content: {
    alignItems: "flex-start",
    backgroundColor: "#e2e1e0",
    justifyContent: "space-evenly",
    display: "flex",
    minHeight: "calc(100vh - 40px)", // TODO: use CSS grid instead of this calc hack
  },
  header: {
    alignItems: "center",
    backgroundColor: "#333",
    boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
    display: "flex",
    height: 40,
  },
  link: {
    color: "white",
    display: "block",
    marginLeft: 20,
    textDecoration: "none",
  },
};
