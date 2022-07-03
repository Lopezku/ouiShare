import {
  Button,
  Container,
  Stack,
  TextField,
  Typography,
  Link,
  FormControlLabel,
  RadioGroup,
  Radio,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { signup } from "../../api/users";
import { loginUser } from "../../helpers/authHelper";
import { useNavigate } from "react-router-dom";
import ErrorAlert from "../ErrorAlert";
import { isLength, isEmail, contains } from "validator";

const SignupView = () => {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState("");
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    name: "",
    address: "",
    gender: "",
    phone: "",
    age: "",
    needs: "",
    offers: "",
    friends: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const formatFormData = (formData) => {
    const keysToFormat = ["needs", "offers"];
    return Object.entries(formData).reduce((acc, [key, value]) => {
      if (keysToFormat.includes(key)) {
        acc[key] = value.split(",");
      } else {
        acc[key] = value;
      }
      return acc;
    }, {});
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validate();
    if (Object.keys(errors).length !== 0) return;
    const data = await signup(formatFormData(formData));

    if (data.error) {
      setServerError(data.error);
    } else {
      loginUser(data);
      navigate("/");
    }
  };

  const validate = () => {
    const errors = {};

    if (!isLength(formData.username, { min: 4, max: 20 })) {
      errors.username = "Identifiant entre 4 et 20 caractères";
    }

    if (contains(formData.username, " ")) {
      errors.username = "Doit contenir des caractères autorisés";
    }

    if (!isLength(formData.password, { min: 6 })) {
      errors.password = "Doit avoir au moins 6 caractères";
    }

    if (!isEmail(formData.email)) {
      errors.email = "Adresse email svp";
    }

    setErrors(errors);

    return errors;
  };

  return (
    <Container>
      <Stack alignItems='center'>
        <Typography variant='h2' color='text.secondary'>
          <Link href='/' color='inherit' underline='none'>
            OuiShare
          </Link>
        </Typography>
        <Typography variant='h5'>Créer un compte</Typography>
        <Typography color='text.secondary'>
          Vous avez déjà un compte? <Link href='/login'>Login</Link>
        </Typography>
        <Box component='form' onSubmit={handleSubmit}>
          <TextField
            label='Identifiant'
            fullWidth
            margin='normal'
            autoFocus
            required
            id='username'
            name='username'
            onChange={handleChange}
            error={errors.username !== undefined}
            helperText={errors.username}
          />
          <TextField
            label='Adresse - Email'
            fullWidth
            margin='normal'
            autoComplete='email'
            required
            id='email'
            name='email'
            onChange={handleChange}
            error={errors.email !== undefined}
            helperText={errors.email}
          />
          <TextField
            label='Mot de passe'
            fullWidth
            required
            margin='normal'
            autoComplete='password'
            id='password'
            name='password'
            type='password'
            onChange={handleChange}
            error={errors.password !== undefined}
            helperText={errors.password}
          />
          <TextField
            label='Nom complet'
            fullWidth
            required
            margin='normal'
            autoComplete='name'
            id='name'
            name='name'
            type='name'
            onChange={handleChange}
            error={errors.name !== undefined}
            helperText={errors.name}
          />
          <RadioGroup>
            <FormControlLabel
              control={
                <Radio
                  defaultChecked
                  onChange={handleChange}
                  id='gender'
                  name='gender'
                />
              }
              label='Homme'
              value='homme'
            />
            <FormControlLabel
              control={
                <Radio onChange={handleChange} id='gender' name='gender' />
              }
              label='Femme'
              value='femme'
            />
          </RadioGroup>

          <TextField
            label='Adresse'
            fullWidth
            margin='normal'
            autoComplete='address'
            required
            id='address'
            name='address'
            onChange={handleChange}
            error={errors.address !== undefined}
            helperText={errors.address}
          />
          <TextField
            label='Téléphone'
            fullWidth
            required
            margin='normal'
            autoComplete='phone'
            id='phone'
            name='phone'
            onChange={handleChange}
            error={errors.lastname !== undefined}
            helperText={errors.lastname}
          />
          <TextField
            label='Age'
            fullWidth
            required
            margin='normal'
            autoComplete='age'
            id='age'
            name='age'
            onChange={handleChange}
            error={errors.age !== undefined}
            helperText={errors.age}
          />
          <TextField
            label='Besoins: si vous en avez plusieurs séparer-les avec des ,'
            fullWidth
            required
            margin='normal'
            autoComplete='needs'
            id='needs'
            name='needs'
            onChange={handleChange}
            error={errors.needs !== undefined}
            helperText={errors.needs}
          />
          <TextField
            label='Offres: si vous en avez plusieurs séparer-les avec des ,'
            fullWidth
            required
            margin='normal'
            autoComplete='offers'
            id='offers'
            name='offers'
            onChange={handleChange}
            error={errors.offers !== undefined}
            helperText={errors.offers}
          />
          <ErrorAlert error={serverError} />
          <Button type='submit' fullWidth variant='contained'>
            Créer mon compte
          </Button>
        </Box>
      </Stack>
    </Container>
  );
};

export default SignupView;
