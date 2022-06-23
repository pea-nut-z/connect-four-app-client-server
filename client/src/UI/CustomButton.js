import React from "react";
import { Button } from "react-bootstrap";

export default function CustomButton({ id, testid, link, text, disabled, type, func, funcArgu }) {
  return (
    <Button
      className={`w-100 mt-3 text-center ${link ? "text-decoration-none" : "btn btn-warning "}`}
      id={id}
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
