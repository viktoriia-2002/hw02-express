const express = require("express");

const authRouter = express.Router();

const isEmptyBody = require("../../middlewares/isEmptyBody");
const authenticate = require("../../middlewares/authenticate");

const { upload } = require("../../middlewares/upload");

const {
  signup,
  login,
  getCurrentUser,
  logoutUser,
  updateAvatar,
  verifyEmail,
  resendVerifyEmail,
} = require("../../controllers/authControllers");

const { useValidationEmail } = require("../../middlewares/useValidationEmail");

const { useEmailSchema } = require("../../middlewares/useEmailSchema");

authRouter.post("/register", useValidationEmail, isEmptyBody, signup);

authRouter.get("/verify/:verificationCode", verifyEmail);

authRouter.post("/verify", useEmailSchema, resendVerifyEmail);

authRouter.post("/login", isEmptyBody, login);

authRouter.get("/current", authenticate, getCurrentUser);

authRouter.post("/logout", authenticate, logoutUser);

authRouter.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  updateAvatar
);

module.exports = authRouter;
