const express = require("express");
const router = express.Router();
const userControllers = require("../controllers/userControllers");
const { verifyToken } = require("../../middleware/auth");

router.post("/register", userControllers.register);
router.post("/login", userControllers.login);

router.post("/forgotPassword", userControllers.forgotPassword);
router.post("/sendInvitation", userControllers.sendInvitation);
router.get("/invitations/:userId", userControllers.getUsersInvitations);
router.post(
  "/updateInvitations/:invitationId",
  userControllers.updateInvitations
);
router.get("/offers", userControllers.search);
router.get("/random", userControllers.getRandomUsers);
router.get("/story", function (req, res) {
  res.send("GET request to the storypage");
});
router.get("/:username", userControllers.getUser);
router.patch("/:id", verifyToken, userControllers.updateUser);

module.exports = router;
