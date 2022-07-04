import { Card, IconButton, Stack, Typography, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import {
  AiFillCheckCircle,
  AiFillEdit,
  AiTwotoneTool,
  AiTwotoneThunderbolt,
} from "react-icons/ai";
import { isLoggedIn } from "../helpers/authHelper";
import ContentDetails from "./ContentDetails";

import UserContentBox from "./UserContentBox";
import HorizontalStack from "./util/HorizontalStack";

import "./userCard.css";

const UserCard = (props) => {
  const { preview, user } = props;
  const userFromAuth = isLoggedIn();
  let isAuthor = false;
  if (userFromAuth !== null) {
    isAuthor = userFromAuth.username === user.username;
  }
  const theme = useTheme();
  const iconColor = theme.palette.primary.main;

  const formatter = new Intl.ListFormat("fr", {
    style: "long",
    type: "conjunction",
  });
  const formattedOffers = formatter.format(user.offers);
  const formattedNeeds = formatter.format(user.needs);

  return (
    <Card
      sx={{ padding: 0, backgroundColor: "green.50" }}
      className='post-card'
    >
      <Box className={preview}>
        <HorizontalStack spacing={0} alignItems='initial'>
          <Stack
            justifyContent='space-between '
            alignItems='center'
            spacing={1}
            sx={{
              backgroundColor: "grey.100",
              width: "50px",
              padding: theme.spacing(1),
            }}
          ></Stack>
          <UserContentBox clickable={preview} post={user}>
            <HorizontalStack justifyContent='space-between'>
              <ContentDetails username={user.username} />
              <Box>
                {user && isAuthor && (
                  <HorizontalStack>
                    <IconButton size='small'>
                      <AiFillEdit color={iconColor} />
                    </IconButton>
                    <IconButton size='small'>
                      <AiFillCheckCircle color={theme.palette.error.main} />
                    </IconButton>
                  </HorizontalStack>
                )}
              </Box>
            </HorizontalStack>

            <Typography
              variant='h5'
              gutterBottom
              sx={{ overflow: "hidden", mt: 1, maxHeight: 125 }}
              className='title'
            >
              Nom complet: {user.name}
            </Typography>
            <Typography
              variant='h5'
              gutterBottom
              sx={{ overflow: "hidden", mt: 1, maxHeight: 125 }}
              className='title'
            >
              Age: {user.age} ans
            </Typography>
            <HorizontalStack sx={{ mt: 1 }}>
              <AiTwotoneThunderbolt />
              <Typography
                variant='subtitle2'
                color='text.secondary'
                sx={{ fontWeight: "bold" }}
              >
                Besoins: {formattedNeeds}
              </Typography>
            </HorizontalStack>
            <HorizontalStack sx={{ mt: 1 }}>
              <AiTwotoneTool />
              <Typography
                variant='subtitle2'
                color='text.secondary'
                sx={{ fontWeight: "bold" }}
              >
                Compétences: {formattedOffers}
              </Typography>
            </HorizontalStack>
          </UserContentBox>
        </HorizontalStack>
      </Box>
    </Card>
  );
};

export default UserCard;
