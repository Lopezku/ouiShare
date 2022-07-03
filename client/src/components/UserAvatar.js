import { Avatar } from "@mui/material";
import React from "react";

const UserAvatar = ({ height, width, username }) => {
  return (
    <Avatar
      sx={{
        height: height,
        width: width,
        backgroundColor: "lightgray",
      }}
      //src={"https://avatars.dicebear.com/api/micah/:seed.svg"}
      //src={`https://source.unsplash.com/user/c_v_r/${height}x${width}`}
      src={`https://ui-avatars.com/api/?background=random&name=${username}`}
    />
  );
};

export default UserAvatar;
