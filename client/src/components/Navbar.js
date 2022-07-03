import { useTheme } from "@emotion/react";
import {
  IconButton,
  Stack,
  TextField,
  Typography,
  Link,
  Button,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import "react-icons/ai";
import "react-icons/ri";
import { AiFillHome, AiTwotoneApi, AiOutlineSearch } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { isLoggedIn, logoutUser } from "../helpers/authHelper";
import UserAvatar from "./UserAvatar";
import HorizontalStack from "./util/HorizontalStack";

const Navbar = () => {
  const navigate = useNavigate();
  const user = isLoggedIn();
  const theme = useTheme();
  const username = user && isLoggedIn().username;
  const [search, setSearch] = useState("");
  const [searchIcon, setSearchIcon] = useState(false);
  const [width, setWindowWidth] = useState(0);

  useEffect(() => {
    updateDimensions();

    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const mobile = width < 500;
  const navbarWidth = width < 600;

  const updateDimensions = () => {
    const width = window.innerWidth;
    setWindowWidth(width);
  };

  const handleLogout = async (e) => {
    logoutUser();
    navigate("/login");
  };

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/search?" + new URLSearchParams({ search }));
  };

  const handleSearchIcon = (e) => {
    setSearchIcon(!searchIcon);
  };

  return (
    <Stack mb={2}>
      <Stack
        direction='row'
        alignItems='center'
        justifyContent='space-between'
        sx={{
          pt: 2,
          pb: 0,
        }}
        spacing={!mobile ? 2 : 0}
      >
        <HorizontalStack>
          <AiTwotoneApi
            size={33}
            color={theme.palette.primary.main}
            onClick={() => navigate("/")}
          />
          <Typography
            sx={{ display: mobile ? "none" : "block" }}
            variant={navbarWidth ? "h6" : "h4"}
            mr={1}
            color={theme.palette.primary.main}
          >
            <Link href='/' color='inherit' underline='none'>
              OuiShare
            </Link>
          </Typography>
          <Typography
            sx={{ display: mobile ? "none" : "block" }}
            variant={navbarWidth ? "h10" : "h8"}
            mr={1}
            color='#e3cf4d'
          >
            Réseau social
          </Typography>
        </HorizontalStack>

        {!navbarWidth && (
          <Box component='form' onSubmit={handleSubmit}>
            <TextField
              size='small'
              label='Chercher des offres de services'
              sx={{ flexGrow: 1, maxWidth: 300 }}
              onChange={handleChange}
              value={search}
            />
          </Box>
        )}

        <HorizontalStack>
          {mobile && (
            <IconButton onClick={handleSearchIcon}>
              <AiOutlineSearch />
            </IconButton>
          )}

          <IconButton href='/'>
            <AiFillHome />
          </IconButton>
          {user ? (
            <>
              <IconButton href={"/users/" + username}>
                <UserAvatar width={30} height={30} username={user.username} />
              </IconButton>
              <Button onClick={handleLogout}>Se déconnecter</Button>
            </>
          ) : (
            <>
              <Button variant='text' sx={{ minWidth: 80 }} href='/signup'>
                Créer un compte
              </Button>
              <Button variant='text' sx={{ minWidth: 65 }} href='/login'>
                Se connecter
              </Button>
            </>
          )}
        </HorizontalStack>
      </Stack>
      {navbarWidth && searchIcon && (
        <Box component='form' onSubmit={handleSubmit} mt={2}>
          <TextField
            size='small'
            label='Chercher des offres de services...'
            fullWidth
            onChange={handleChange}
            value={search}
          />
        </Box>
      )}
    </Stack>
  );
};

export default Navbar;