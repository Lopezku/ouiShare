import {
  Button,
  Container,
  Link,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { forgotPassword } from "../../api/users";
import Alert from "../Alert";
import Copyright from "../Copyright";

const LoginView = () => {
  const [formData, setFormData] = useState({
    email: "",
  });

  const [serverError, setServerError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleChange = (e) => {
    setServerError(null);
    setSuccessMessage(null);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = await forgotPassword(formData);

    if (data.error) {
      setServerError(data.error);
    }
    if (data.message) {
      setSuccessMessage(data.message);
    }
  };

  return (
    <Container>
      <Stack alignItems='center'>
        <Typography variant='h2' color='text.secondary'>
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

          {serverError && <Alert error={serverError} />}
          {successMessage && (
            <Alert severity='success' message={successMessage} />
          )}
          <Button type='submit' fullWidth variant='contained'>
            Envoyer un email de récupération
          </Button>
        </Box>
        <Box>
          <Copyright />
        </Box>
        <Typography variant='h4' color='text.secondary'>
          <Link href='/login' color='inherit' underline='none'>
            Login
          </Link>
        </Typography>
      </Stack>
    </Container>
  );
};

export default LoginView;
