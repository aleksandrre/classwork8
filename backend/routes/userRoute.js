import express from "express";
import { getAllUsers, getOneUser, login, register } from "../controllers/userController.js";
import { authMiddlware } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.get("/getallUser",authMiddlware, getAllUsers);

router.get("/getOneUser/:id", getOneUser);

export default router;
