import express from "express";
import { login, register, verifyEmailController } from "../Controllers/AuthController.js";

const AuthRoute = express.Router();

AuthRoute.post("/login", login);
AuthRoute.post("/register", register);
AuthRoute.get("/verify-email", verifyEmailController);

export default AuthRoute;