const express = require("express");
const router = express.Router();
const userControllers = require("../controllers/userControllers");
const { verifyToken } = require("../../middleware/auth");

router.post("/register", userControllers.register);
router.post("/login", userControllers.login);
router.post("/forgotPassword", userControllers.forgotPassword);
router.get("/offers", userControllers.search);
router.get("/random", userControllers.getRandomUsers);

router.get("/:username", userControllers.getUser);
router.patch("/:id", verifyToken, userControllers.updateUser);

module.exports = router;
