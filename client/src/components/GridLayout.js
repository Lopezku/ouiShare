import { Grid, Stack } from "@mui/material";
import React from "react";

const GridLayout = (props) => {
  const { left, right } = props;

  return (
    <Grid container spacing={2}>
      <Grid item xs={8} md={7}>
        {left}
      </Grid>
      <Grid item md={5} xs={4} sx={{ display: { xs: "block", md: "block" } }}>
        {right}
      </Grid>
    </Grid>
  );
};

export default GridLayout;
