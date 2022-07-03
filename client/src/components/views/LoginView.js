import {
  Alert,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Link,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../api/users";
import ErrorAlert from "../ErrorAlert";
import { loginUser } from "../../helpers/authHelper";
import Copyright from "../Copyright";

const LoginView = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [serverError, setServerError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = await login(formData);
    if (data.error) {
      setServerError(data.error);
    } else {
      loginUser(data);
      navigate("/");
    }
  };

  return (
    <Container maxWidth={"xs"} sx={{ mt: 6 }}>
      <Stack alignItems='center'>
        <Typography variant='h2' color='text.secondary' sx={{ mb: 6 }}>
          <Link href='/' color='inherit' underline='none'>
            OuiShare
          </Link>
        </Typography>
        <Typography variant='h5' gutterBottom>
          Login du réseau social du troc
        </Typography>
        <Typography color='text.secondary'>
          Pas encore de compte? <Link href='/signup'>Créer un compte</Link>
        </Typography>
        <Box component='form' onSubmit={handleSubmit}>
          <TextField
            label='Email Address'
            fullWidth
            margin='normal'
            autoComplete='email'
            autoFocus
            required
            id='email'
            name='email'
            onChange={handleChange}
          />
          <TextField
            label='Password'
            fullWidth
            required
            margin='normal'
            id='password  '
            name='password'
            onChange={handleChange}
            type='password'
          />

          <ErrorAlert error={serverError} />
          <Button type='submit' fullWidth variant='contained'>
            Login
          </Button>
        </Box>
        <Box sx={{ mt: 3 }}>
          <Copyright />
        </Box>
        <Typography variant='h4' color='text.secondary'>
          <Link href='/forgetPassword' color='inherit'>
            Mot de passe perdu?
          </Link>
        </Typography>
      </Stack>
    </Container>
  );
};

export default LoginView;
