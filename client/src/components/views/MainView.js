import { Container } from "@mui/material";

import React from "react";

import GridLayout from "../GridLayout";

import Navbar from "../Navbar";

import Sidebar from "../Sidebar";

import PostBrowser from "../OffersBrowser";

const MainView = () => {
  return (
    <Container>
      <Navbar />
      <GridLayout
        left={<PostBrowser createPost contentType='offers' />}
        right={<Sidebar />}
      />
    </Container>
  );
};

export default MainView;
