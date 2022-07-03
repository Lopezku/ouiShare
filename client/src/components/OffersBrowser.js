import { Button, Stack, Typography } from "@mui/material";

import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getOffers } from "../api/users";
import { isLoggedIn } from "../helpers/authHelper";

import Loading from "./Loading";

import UserCard from "./UserCard";

const OffersBrowser = (props) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [end, setEnd] = useState(false);
  const [count, setCount] = useState(0);
  const user = isLoggedIn();

  const [search] = useSearchParams();
  const [effect, setEffect] = useState(false);

  const searchExists =
    search && search.get("search") && search.get("search").length > 0;

  const fetchUsers = async () => {
    setLoading(true);
    const newPage = page + 1;
    setPage(newPage);

    let query = {
      page: newPage,
    };

    let data;
    if (props.contentType === "offers") {
      if (props.profileUser) query.author = props.profileUser.username;
      if (searchExists) query.search = search.get("search");

      data = await getOffers(user && user.token, query);
    }
    if (data.data.length < 10) {
      setEnd(true);
    }

    setLoading(false);
    if (!data.error) {
      setUsers([...users, ...data.data]);
      setCount(data.count);
    }
  };

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [effect]);

  useEffect(() => {
    setUsers([]);
    setPage(0);
    setEnd(false);
    setEffect(!effect);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const handleBackToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <Stack spacing={2}>
        {searchExists && (
          <Box>
            <Typography variant='h5' gutterBottom>
              Résultats pour"{search.get("search")}"
            </Typography>
            <Typography color='text.secondary' variant='span'>
              {count} résultats trouvés
            </Typography>
          </Box>
        )}
        {!users.length && searchExists && (
          <Typography variant='string' gutterBottom>
            {" "}
            Pas d'utilisateurs pour la recherche"{search.get("search")}"
          </Typography>
        )}
        {users.map((user, i) => (
          <UserCard preview='primary' key={user._id} user={user} />
        ))}

        {loading && <Loading />}
        {end ? (
          <Stack py={5} alignItems='center'>
            <Typography variant='h5' color='text.secondary' gutterBottom>
              {users.length > 0 ? (
                <>Tous les utilisateurs ont été vus</>
              ) : (
                <>Pas d'utilisateurs</>
              )}
            </Typography>
            <Button variant='text' size='small' onClick={handleBackToTop}>
              Revenir en haut
            </Button>
          </Stack>
        ) : (
          !loading &&
          users &&
          users.length > 0 && (
            <Stack pt={2} pb={6} alignItems='center' spacing={2}>
              <Button onClick={fetchUsers} variant='contained'>
                Voir plus
              </Button>
              <Button variant='text' size='small' onClick={handleBackToTop}>
                Revenir en haut
              </Button>
            </Stack>
          )
        )}
      </Stack>
    </>
  );
};

export default OffersBrowser;
