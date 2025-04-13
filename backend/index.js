import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import User from "./models/User.js";
import bcrypt from "bcrypt";
import {
  register,
  login,
  getAllUsers,
  getOneUser,
} from "./controllers/userController.js";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/register", register);

app.post("/login", login);

app.get("/getallUser", getAllUsers);
console.log("s");

app.get("/getOneUser/:id", getOneUser);

app.listen(3001, () => {
  console.log("სერვერი დაისტარტა 3001 პორტზე");
  mongoose
    .connect(
      "mongodb+srv://aleksandre:12345@cluster0.nx872oi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    )
    .then(() => console.log("ბაზასთან (mongodb) კავშირი წარმატებულია"))
    .catch((err) =>
      console.error("MongoDB-სთან დაკავშირება ვერ მოხერხდა:", err)
    );
});
