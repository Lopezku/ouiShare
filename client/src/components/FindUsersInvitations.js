import {
  Card,
  Divider,
  IconButton,
  Link,
  Button,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { MdRefresh } from "react-icons/md";
import {
  getUsersInvitations,
  updateInvitationStatus,
} from "../api/invitations";
import { isLoggedIn } from "../helpers/authHelper";
import Loading from "./Loading";
import UserAvatar from "./UserAvatar";
import HorizontalStack from "./util/HorizontalStack";

const AcceptedInvitations = ({ invitations }) => {
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
const PendingInvitations = ({ invitations, fetchInvitations }) => {
  const handleInvitationRequest = async (invitationId, status) => {
    const data = await updateInvitationStatus(invitationId, status);
    console.log(data);
    if (data.data.message === "success") {
      fetchInvitations();
    }
  };
  return invitations.length ? (
    invitations.map((invitation) => {
      return (
        <HorizontalStack justifyContent='space-between' key={invitation._id}>
          <HorizontalStack>
            <UserAvatar width={30} height={30} />
            <Typography>
              Invitations en attente reçues de :{invitation.sender.name}
            </Typography>
            <Button
              color='success'
              onClick={() =>
                handleInvitationRequest(invitation._id, "accepted")
              }
            >
              A{" "}
            </Button>
            <Button
              color='error'
              onClick={() =>
                handleInvitationRequest(invitation._id, "declined")
              }
            >
              R{" "}
            </Button>
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
            <PendingInvitations
              invitations={invitations.pending}
              fetchInvitations={fetchInvitations}
            />
            {
              <AcceptedInvitations invitations={invitations.accepted} />
              /* <DeclinedInvitations invitations={invitations.declined} /> */
            }
          </>
        )}
      </Stack>
    </Card>
  );
};

export default FindUsersInvitations;
