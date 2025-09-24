import express from "express";
import { login, register } from "../Controllers/AuthController.js";

const AuthRoute = express.Router();

AuthRoute.post("/login", login);
AuthRoute.post("/register", register);

export default AuthRoute;
