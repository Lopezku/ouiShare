import { useTheme } from "@emotion/react";
import { Box } from "@mui/material";
import React from "react";

const UserContentBox = (props) => {
  const { clickable, editing } = props;
  const theme = useTheme();

  return (
    <>
      {clickable && !editing ? (
        <Box
          sx={{
            padding: theme.spacing(2),
            width: "92%",
            "&:hover": { backgroundColor: "grey.50", cursor: "pointer" },
          }}
        >
          {props.children}
        </Box>
      ) : (
        <Box sx={{ padding: theme.spacing(2), width: "90%" }}>
          {props.children}
        </Box>
      )}
    </>
  );
};

export default UserContentBox;
