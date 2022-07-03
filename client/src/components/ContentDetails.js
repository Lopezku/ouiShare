import { Avatar, Typography, Link } from "@mui/material";
import React from "react";
import HorizontalStack from "./util/HorizontalStack";
import Moment from "react-moment";
import UserAvatar from "./UserAvatar";

const ContentDetails = ({ username }) => {
  return (
    <HorizontalStack sx={{}}>
      <UserAvatar width={30} height={30} />
      <Typography variant='subtitle2' color='text.secondary' gutterBottom>
        <Link
          color='inherit'
          underline='hover'
          onClick={(e) => {
            e.stopPropagation();
          }}
          href={"/users/" + username}
        >
          {username}
        </Link>
      </Typography>
    </HorizontalStack>
  );
};

export default ContentDetails;
