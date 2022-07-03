import { Stack } from "@mui/material";
import React from "react";

import FindUsersInvitations from "./FindUsersInvitations";
import Footer from "./Footer";

const Sidebar = () => {
  return (
    <Stack spacing={2}>
      <FindUsersInvitations />
      <Footer />
    </Stack>
  );
};

export default Sidebar;
