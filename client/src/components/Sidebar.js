import { Stack } from "@mui/material";
import React from "react";

import FindUsers from "./FindUsers";
import Footer from "./Footer";

const Sidebar = () => {
  return (
    <Stack spacing={2}>
      <FindUsers />
      <Footer />
    </Stack>
  );
};

export default Sidebar;
