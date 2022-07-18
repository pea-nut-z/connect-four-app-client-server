import React from "react";
import { Link } from "react-router-dom";

export default function CustomLink({ text, moreText, id, testid, to }) {
  return (
    <p data-testid="linkText" className="text-center mt-2">
      {moreText}
      <Link data-testid={testid} className="text-decoration-none" id={id} to={to}>
        {text}
      </Link>
    </p>
  );
}
