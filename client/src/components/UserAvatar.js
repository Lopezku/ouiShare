import { Avatar } from "@mui/material";
import React from "react";

const UserAvatar = ({ height, width }) => {
  return (
    <Avatar
      sx={{
        height: height,
        width: width,
        backgroundColor: "lightgray",
      }}
      src={"https://avatars.dicebear.com/api/micah/:seed.svg"}
      // src={"https://robohash.org/" + username}
    />
  );
};

export default UserAvatar;
