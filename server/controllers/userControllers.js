const User = require("../../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { send } = require("../services/mail");

const getUserRight = (token, user) => {
  return {
    token,
    username: user.username,
    userId: user._id,
    isAdmin: user.isAdmin,
  };
};

const buildToken = (user) => {
  return {
    userId: user._id,
    isAdmin: user.isAdmin,
  };
};

const register = async (req, res) => {
  try {
    const {
      username,
      email,
      password,
      name,
      address,
      gender,
      phone,
      age,
      needs,
      offers,
      friends,
    } = req.body;

    if (!(username && email && password)) {
      throw new Error("Champs requis");
    }
    const normalizedEmail = email.toLowerCase();
    const hashedPassword = await bcrypt.hash(password, 10);
    const existingUser = await User.findOne({
      $or: [{ email: normalizedEmail }, { username }],
    });

    if (existingUser) {
      throw new Error("Email et username doivent être uniques");
    }

    const user = await User.create({
      username,
      email: normalizedEmail,
      password: hashedPassword,
      name,
      address,
      gender,
      phone,
      age,
      needs,
      offers,
      friends,
    });

    const token = jwt.sign(buildToken(user), process.env.TOKEN_KEY);
    return res.json(getUserRight(token, user));
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!(email && password)) {
      throw new Error("Tous les champs sont requis");
    }

    const normalizedEmail = email.toLowerCase();

    const user = await User.findOne({ email: normalizedEmail });

    if (!user) {
      throw new Error("Email ou mot de passe incorrect");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error("Email ou mot de passe incorrect");
    }

    const token = jwt.sign(buildToken(user), process.env.TOKEN_KEY);

    return res.json(getUserRight(token, user));
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: err.message });
  }
};

const search = async (req, res) => {
  try {
    const search = req.query.search;
    let users = [];
    if (search) users = await User.find({ offers: { $in: search } });
    else {
      users = await User.find({});
    }

    return res.status(200).json({ data: users });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      throw new Error("Email requis");
    }
    const normalizedEmail = email.toLowerCase();
    const user = await User.findOne({ email: normalizedEmail });
    if (!user) {
      throw new Error("Vérifier votre boite email");
    }
    const newpassword = Math.random().toString(36).slice(-12);
    const hashedPassword = await bcrypt.hash(newpassword, 10);
    user.password = hashedPassword;
    await user.save();
    const message = {
      from: "ouishare93@gmail.com",
      to: email,
      subject: "Récupération de votre mot de passe",
      html: `<p><b>Bonjour de la part de toute l'équipe de Oui Share</b><img src="../public/troc.png"/></p>
        <p>Voici le mot de passe généré aléatoirement ${newpassword}<p>
         <p>N'hésitez pas à changer le mot de passe une fois connecté</p>
         <p>Vous pouvez vous connecter sur: <a href="https://ouishare.herokuapp.com/" target="_blank">https://ouishare.herokuapp.com/</a></p>`,
    };
    await send(message);
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: err.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { userId, isAdmin, ...props } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      throw new Error("User does not exist");
    }

    Object.entries(props).map(([key, value]) => {
      user[key] = value;
    });

    await user.save();

    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

const getUser = async (req, res) => {
  try {
    const username = req.params.username;

    const user = await User.findOne({ username }).select("-password");

    if (!user) {
      throw new Error("User does not exist");
    }

    const data = {
      user,
    };

    return res.status(200).json(data);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

const getRandomUsers = async (req, res) => {
  try {
    let { size } = req.query;

    const users = await User.find().select("-password");

    const randomUsers = [];

    if (size > users.length) {
      size = users.length;
    }

    const randomIndices = getRandomIndices(size, users.length);

    for (let i = 0; i < randomIndices.length; i++) {
      const randomUser = users[randomIndices[i]];
      randomUsers.push(randomUser);
    }

    return res.status(200).json(randomUsers);
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: err.message });
  }
};

const getRandomIndices = (size, sourceSize) => {
  const randomIndices = [];
  while (randomIndices.length < size) {
    const randomNumber = Math.floor(Math.random() * sourceSize);
    if (!randomIndices.includes(randomNumber)) {
      randomIndices.push(randomNumber);
    }
  }
  return randomIndices;
};

module.exports = {
  register,
  login,

  search,
  getUser,
  getRandomUsers,
  updateUser,
  forgotPassword,
};
