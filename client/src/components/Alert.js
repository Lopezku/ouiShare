import { Alert as AlertUI } from "@mui/material";
import React from "react";

const Alert = ({ message, error, severity = "error" }) => {
  return (
    (error || message) && (
      <AlertUI variant='filled' severity={severity}>
        {error}
        {message}
      </AlertUI>
    )
  );
};

export default Alert;
