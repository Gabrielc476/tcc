import React from "react";
import { Link } from "react-router-dom";
import "./Styles.css";

const Sidebar = () => {
  return (
    <div className="container">
      <div className="icones">
        <Link to="/notifications">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            width="24"
            height="24"
          >
            <path d="M8 0a8 8 0 1 0 8 8A8 8 0 0 0 8 0ZM7.05 4.85h2V6.8a.32.32 0 0 1-.2.3.41.41 0 0 1-.2.1l-.4.1a1.77 1.77 0 0 0-1.4.7 1.78 1.78 0 0 0-.3 1.5 1.78 1.78 0 0 0 .3.6 1.27 1.27 0 0 0 1 .3 1.31 1.31 0 0 0 .9-.3.33.33 0 0 1 .3-.1h.3a.43.43 0 0 1 .2.3l.2 1.6a.31.31 0 0 1-.2.3 4.09 4.09 0 0 1-1.7.4 3.32 3.32 0 0 1-1.3-.2 2.8 2.8 0 0 1-1-.6 2.88 2.88 0 0 1-.7-1 3.68 3.68 0 0 1-.3-1.3A4.24 4.24 0 0 1 6 6.4a3.2 3.2 0 0 1 1.6-1h-.6a.32.32 0 0 1-.3-.2v-1Zm.2 6.75A.92.92 0 0 1 7.8 11a.92.92 0 0 1-.55-.1.92.92 0 0 1-.25-.25.92.92 0 0 1-.1-.55A.92.92 0 0 1 7 9.55a.92.92 0 0 1 .55-.25.92.92 0 0 1 .55.1.92.92 0 0 1 .25.25.92.92 0 0 1 .1.55.92.92 0 0 1-.1.55.92.92 0 0 1-.25.25A.92.92 0 0 1 7.25 11.6Z" />
          </svg>
        </Link>
        <Link to="/">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            width="24"
            height="24"
          >
            <path d="M6 2h10v10h-2V4H6V2ZM0 4h10v10H0V4Zm2 2v6h6V6H2Z" />
          </svg>
        </Link>
        <Link to="/profile">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            width="24"
            height="24"
          >
            <path d="M8 2a3 3 0 1 1-3 3 3 3 0 0 1 3-3ZM3 12a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v1H3v-1Z" />
          </svg>
        </Link>
        <a href="https://github.com/" target="_blank" rel="noopener noreferrer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            width="24"
            height="24"
          >
            <path d="M8 0a8 8 0 0 0-2.52 15.59c.4.07.54-.17.54-.38v-1.32c-2.33.51-2.82-1.11-2.82-1.11A2.24 2.24 0 0 0 3.23 12c-.78-.53.06-.52.06-.52a1.76 1.76 0 0 1 1.29.88 1.8 1.8 0 0 0 2.41.7 1.8 1.8 0 0 1 .54-1.13c-1.86-.21-3.81-.93-3.81-4.15a3.24 3.24 0 0 1 .87-2.26 3 3 0 0 1 .08-2.23s.7-.22 2.3.87a8 8 0 0 1 4.2 0c1.6-1.09 2.3-.87 2.3-.87a3 3 0 0 1 .08 2.23 3.24 3.24 0 0 1 .87 2.26c0 3.23-1.95 3.94-3.81 4.15a2 2 0 0 1 .57 1.56v2.31c0 .21.14.46.55.38A8 8 0 0 0 8 0Z" />
          </svg>
        </a>
      </div>
    </div>
  );
};

export default Sidebar;
