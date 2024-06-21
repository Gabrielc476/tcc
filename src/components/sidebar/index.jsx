import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faHome,
  faUser,
  faCodeBranch,
} from "@fortawesome/free-solid-svg-icons";
import "./sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar-container">
      <div className="sidebar-icons">
        <Link to="/notifications" className="sidebar-link">
          <FontAwesomeIcon icon={faBell} className="sidebar-icon" />
        </Link>
        <Link to="/" className="sidebar-link">
          <FontAwesomeIcon icon={faHome} className="sidebar-icon" />
        </Link>
        <Link to="/profile" className="sidebar-link">
          <FontAwesomeIcon icon={faUser} className="sidebar-icon" />
        </Link>
        <a
          href="https://github.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="sidebar-link"
        >
          <FontAwesomeIcon icon={faCodeBranch} className="sidebar-icon" />
        </a>
      </div>
    </div>
  );
};

export default Sidebar;
