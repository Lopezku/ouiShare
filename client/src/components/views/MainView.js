import { Container } from "@mui/material";

import React from "react";

import GridLayout from "../GridLayout";

import Navbar from "../Navbar";

import Sidebar from "../Sidebar";

import OffersBrowser from "../OffersBrowser";

const MainView = () => {
  return (
    <Container>
      <Navbar />
      <GridLayout
        left={<OffersBrowser contentType='offers' />}
        right={<Sidebar />}
      />
    </Container>
  );
};

export default MainView;
