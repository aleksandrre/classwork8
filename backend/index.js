import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import User from "./models/User.js";
import bcrypt from "bcrypt";
import { register } from "./controllers/userController.js";
const app = express();
app.use(cors());
app.use(express.json());

app.post("/register", register);

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "შეავსეთ ყველა ველი" });
    }
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "მეილი  არასწორია" });
    }
    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ success: false, message: "პაროლი არასწორია" });
    }
    
    res
      .status(200)
      .json({ success: true, message: "თქვენ წარმატებით შეხვედით " });
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ success: false, message: "სერვერის შეცდომა" });
  }
});

app.get("/getallUser", async (req, res) => {
  try {
    const AllUser = await User.find();
    res.status(200).json({ success: true, data: AllUser });
  } catch (err) {
    res.status(500).json({ sucess: false, message: "სერვერის შეცდომა" });
  }
});

app.listen(3001, () => {
  console.log("სერვერი დაისტარტა 3001 პორტზე");
  mongoose
    .connect(
      "mongodb+srv://tamarichokheli:12345@cluster0.0l5qo6f.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0"
    )
    .then(() => console.log("ბაზასთან (mongodb) კავშირი წარმატებულია"))
    .catch((err) =>
      console.error("MongoDB-სთან დაკავშირება ვერ მოხერხდა:", err)
    );
});
