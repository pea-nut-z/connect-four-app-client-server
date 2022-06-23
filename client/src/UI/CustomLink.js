import React from "react";
import { Link } from "react-router-dom";

export default function CustomLink({ text, moreText, id, to }) {
  return (
    <p className="text-center mt-2">
      {moreText}
      <Link className="text-decoration-none" id={id} to={to}>
        {text}
      </Link>
    </p>
  );
}
