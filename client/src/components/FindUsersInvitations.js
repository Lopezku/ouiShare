import {
  Card,
  Divider,
  IconButton,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { MdRefresh } from "react-icons/md";
import { getUsersInvitations } from "../api/users";
import { isLoggedIn } from "../helpers/authHelper";
import Loading from "./Loading";
import UserAvatar from "./UserAvatar";
import HorizontalStack from "./util/HorizontalStack";
const PendingInvitations = ({ invitations }) => {
  return invitations.length ? (
    invitations.map((invitation) => {
      return (
        <HorizontalStack justifyContent='space-between' key={invitation._id}>
          <HorizontalStack>
            <UserAvatar width={30} height={30} />
            <Typography>Nom:{invitation.sender.name}</Typography>
          </HorizontalStack>
        </HorizontalStack>
      );
    })
  ) : (
    <div>Pas d'invitations pending</div>
  );
};

const FindUsersInvitations = () => {
  const [loading, setLoading] = useState(true);
  const [invitations, setInvitations] = useState(null);
  const userId = isLoggedIn().userId;

  const fetchInvitations = async () => {
    setLoading(true);

    const data = await getUsersInvitations(userId);
    setLoading(false);

    const groupedInvitations = data.data.invitations.reduce(
      (acc, currentValue) => {
        acc[currentValue.status].push(currentValue);
        return acc;
      },
      { pending: [], accepted: [], declined: [] }
    );
    setInvitations(groupedInvitations);
  };

  useEffect(() => {
    fetchInvitations();
  }, []);

  const handleClick = () => {
    fetchInvitations();
  };

  return (
    <Card>
      <Stack spacing={2}>
        <HorizontalStack justifyContent='space-between'>
          <HorizontalStack>
            <AiOutlineUser />
            <Typography>Voir les invitations</Typography>
          </HorizontalStack>
          <IconButton
            sx={{ padding: 0 }}
            disabled={loading}
            onClick={handleClick}
          >
            <MdRefresh />
          </IconButton>
        </HorizontalStack>

        <Divider />

        {loading ? (
          <Loading />
        ) : (
          <>
            <PendingInvitations invitations={invitations.pending} />
            {/* <AcceptedInvitations invitations={invitations.accepted} />
            <DeclinedInvitations invitations={invitations.declined} /> */}
          </>
        )}
      </Stack>
    </Card>
  );
};

export default FindUsersInvitations;
