import {
  Card,
  Divider,
  IconButton,
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

const DeclinedInvitations = ({ invitations }) => {
  return invitations?.length ? (
    invitations.map((invitation) => {
      return (
        <HorizontalStack justifyContent='space-between' key={invitation._id}>
          <HorizontalStack>
            <UserAvatar
              width={30}
              height={30}
              username={invitation.sender.username}
            />
            <Typography>{invitation.sender.name}</Typography>
          </HorizontalStack>
        </HorizontalStack>
      );
    })
  ) : (
    <div>Pas d'invitations refusées</div>
  );
};
const AcceptedInvitations = ({ invitations }) => {
  return invitations?.length ? (
    invitations.map((invitation) => {
      return (
        <HorizontalStack justifyContent='space-between' key={invitation._id}>
          <HorizontalStack>
            <UserAvatar
              width={30}
              height={30}
              username={invitation.sender.username}
            />
            <Typography>{invitation.sender.name} </Typography>
          </HorizontalStack>
        </HorizontalStack>
      );
    })
  ) : (
    <div>Pas d'invitations acceptées</div>
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
  return invitations?.length ? (
    invitations.map((invitation) => {
      return (
        <HorizontalStack justifyContent='space-between' key={invitation._id}>
          <HorizontalStack>
            <UserAvatar
              width={30}
              height={30}
              username={invitation.sender.username}
            />
            <Typography>Accepter : {invitation.sender.name}</Typography>
            <Divider />
            <br></br>
            <Button
              variant='outlined'
              sx={{ backgroundColor: "white", mt: 1 }}
              color='success'
              onClick={() =>
                handleInvitationRequest(invitation._id, "accepted")
              }
            >
              Oui
            </Button>
            <Button
              variant='outlined'
              sx={{ backgroundColor: "white", mt: 1 }}
              color='error'
              onClick={() =>
                handleInvitationRequest(invitation._id, "declined")
              }
            >
              Non
            </Button>
          </HorizontalStack>
        </HorizontalStack>
      );
    })
  ) : (
    <div>Pas d'invitations en attente</div>
  );
};

const FindUsersInvitations = () => {
  const [loading, setLoading] = useState(true);
  const [errorFind, setErrorFind] = useState(false);
  const [invitations, setInvitations] = useState(null);
  const userId = isLoggedIn() ? isLoggedIn().userId : "";

  const fetchInvitations = async () => {
    setLoading(true);

    const data = await getUsersInvitations(userId);
    const erreur = data.error === "User does not exist";
    //TODO
    if (erreur) {
      setErrorFind(true);
      setLoading(false);
    }

    if (data.data.error !== "User does not exist") {
      setLoading(false);

      const groupedInvitations = data.data.invitations.reduce(
        (acc, currentValue) => {
          acc[currentValue.status].push(currentValue);
          return acc;
        },
        { pending: [], accepted: [], declined: [] }
      );
      setInvitations(groupedInvitations);
    } else if (data.data.error === "User does not exist") {
      console.log("line 133");
      setLoading(false);
      return [];
    }
    if (data.error === "User does not exist") {
      console.log("line erreur");
      setLoading(false);
      return [];
    }
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
            <Typography color='text.secondary'>
              Invitations en attente
            </Typography>
            {errorFind ? (
              <Typography color='text.secondary'>Pas connecté</Typography>
            ) : (
              <PendingInvitations
                invitations={invitations.pending}
                fetchInvitations={fetchInvitations}
              />
            )}
            {/*  <PendingInvitations
              invitations={invitations.pending}
              fetchInvitations={fetchInvitations}
            /> */}
            <Divider />
            <Typography color='text.secondary'>Vos Share amis</Typography>
            <AcceptedInvitations invitations={invitations?.accepted} />
            <Divider />
            <Typography color='text.secondary'>Invitations refusées</Typography>
            <DeclinedInvitations invitations={invitations?.declined} />
          </>
        )}
      </Stack>
    </Card>
  );
};

export default FindUsersInvitations;
