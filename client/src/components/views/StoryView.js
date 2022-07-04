import { Container, Stack, Box, Typography } from "@mui/material";

import React from "react";

import Navbar from "../Navbar";

const StoryView = () => {
  return (
    <Container>
      <Navbar />
      <Stack spacing={2}>
        <Box>
          <Typography variant='h5' gutterBottom>
            Voici notre concept
          </Typography>
          <Typography color='text.secondary' variant='span'>
            Echanger, partager autour d'un thème simple l'intraide ou le troc en
            nature. Vous pouvez rechercher des gens par compétences ou également
            chercher les personnes qui ont besoin de vous. Pas d'argent juste un
            site où vous pourrez faire garder votre chat, apprendre l'espagnol
            ou faire réparer votre machine à laver. Vous devez d'abord inviter
            la personne que vous voulez aider ou qui peut vous aider.
          </Typography>
        </Box>
      </Stack>
    </Container>
  );
};

export default StoryView;
