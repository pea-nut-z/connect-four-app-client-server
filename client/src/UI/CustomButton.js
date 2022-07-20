import React from "react";
import { Button } from "react-bootstrap";

export default function CustomButton({ testid, link, text, disabled, type, func, funcArgu }) {
  return (
    <Button
      className={`btn w-100 mt-3 text-center ${link ? "text-decoration-none" : "btn btn-warning "}`}
      data-testid={testid}
      variant={link ? "link" : "warning"}
      disabled={disabled}
      type={type}
      onClick={() => type === "button" && func(funcArgu)}
    >
      {text}
    </Button>
  );
}
