import { useTheme } from "@emotion/react";
import { Button, Card, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import { isLoggedIn } from "../helpers/authHelper";
import ContentUpdateEditor from "./ContentUpdateEditor";
import Loading from "./Loading";
import UserAvatar from "./UserAvatar";
import HorizontalStack from "./util/HorizontalStack";

const Profile = (props) => {
  const [user, setUser] = useState(null);
  const currentUser = isLoggedIn();
  const theme = useTheme();
  const iconColor = theme.palette.primary.main;

  useEffect(() => {
    if (props.profile) {
      setUser(props.profile.user);
    }
  }, [props.profile]);

  return (
    <Card>
      {user ? (
        <Stack alignItems='center' spacing={2}>
          <Box my={1}>
            <UserAvatar width={150} height={150} username={user.username} />
          </Box>

          <Typography variant='h5'>{user.username}</Typography>

          {props.editing ? (
            <Box>
              <ContentUpdateEditor
                handleSubmit={props.handleSubmit}
                label='name'
                originalContent={user.name}
                validate={props.validate}
              />
            </Box>
          ) : user.name ? (
            <Typography textAlign='center' variant='p'>
              <b>Nom complet: </b>
              {user.name}
            </Typography>
          ) : (
            <Typography variant='p'>
              <i>Pas de nom</i>
            </Typography>
          )}
          {props.editing ? (
            <Box>
              <ContentUpdateEditor
                handleSubmit={props.handleSubmit}
                label='address'
                originalContent={user.address}
                validate={props.validate}
              />
            </Box>
          ) : user.address ? (
            <Typography textAlign='center' variant='p'>
              <b>Adresse complète: </b>
              {user.address}
            </Typography>
          ) : (
            <Typography variant='p'>
              <i>Pas d'adresse</i>
            </Typography>
          )}
          {currentUser && user._id === currentUser.userId && (
            <Box>
              <Button
                startIcon={<AiFillEdit color={iconColor} />}
                onClick={props.handleEditing}
              >
                {props.editing ? <>Annuler</> : <>Modifier mes données</>}
              </Button>
            </Box>
          )}

          {currentUser && user._id !== currentUser.userId && (
            <Button variant='outlined' onClick={props.handleMessage}>
              Message
            </Button>
          )}

          <HorizontalStack>
            <Typography color='text.secondary'>
              Likes <b>{props.profile.posts.likeCount}</b>
            </Typography>
            <Typography color='text.secondary'>
              Posts <b>{props.profile.posts.count}</b>
            </Typography>
          </HorizontalStack>
        </Stack>
      ) : (
        <Loading label='Loading profile' />
      )}
    </Card>
  );
};

export default Profile;
