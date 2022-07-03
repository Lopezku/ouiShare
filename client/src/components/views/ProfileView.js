import { Container, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getUser, updateUser } from "../../api/users";
import { isLoggedIn } from "../../helpers/authHelper";
import { sendInvitation } from "../../api/invitations";
import FindUsersInvitations from "../FindUsersInvitations";
import Footer from "../Footer";
import GridLayout from "../GridLayout";
import Navbar from "../Navbar";
import Profile from "../Profile";
import OffersBrowser from "../OffersBrowser";

const ProfileView = () => {
  /*   const [formData, setFormData] = useState({
    email: "",
  }); */
  const [serverError, setServerError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const [editing, setEditing] = useState(false);
  const [tab, setTab] = useState("posts");
  const user = isLoggedIn();
  const [error, setError] = useState("");
  const params = useParams();
  const navigate = useNavigate();

  const fetchUser = async () => {
    setLoading(true);
    const data = await getUser(params);
    setLoading(false);
    if (data.error) {
      setError(data.error);
    } else {
      setProfile(data);
    }
  };
  const handleChange = (e) => {
    setServerError(null);
    setSuccessMessage(null);

    //setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const content = e.target.content.value;

    await updateUser(user, { [e.target.content.id]: content });

    setProfile({
      ...profile,
      user: { ...profile.user, [e.target.content.id]: content },
    });
    setEditing(false);
  };

  const handleEditing = () => {
    setEditing(!editing);
  };

  const handleMessage = async (e, userReceiverId) => {
    e.preventDefault();
    const data = await sendInvitation(userReceiverId, profile.user._id);

    if (data.error) {
      setServerError(data.error);
    }
    if (data.message) {
      setSuccessMessage(data.message);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <Container>
      <Navbar />

      <GridLayout
        left={<OffersBrowser contentType='offers' />}
        right={
          <Stack spacing={2}>
            <Profile
              profile={profile}
              editing={editing}
              handleSubmit={handleSubmit}
              handleEditing={handleEditing}
              handleMessage={handleMessage}
            />

            <FindUsersInvitations />
            <Footer />
          </Stack>
        }
      />
    </Container>
  );
};

export default ProfileView;
