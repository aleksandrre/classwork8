import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import User from "./models/User.js";
import bcrypt from "bcrypt";
const app = express();
app.use(cors());
app.use(express.json());
const data = [
  { name: "bmw", cylinder: 4, engine: "5.2" },
  { name: "audi", cylinder: 8, engine: "4.2" },
  { name: "golf", cylinder: 2, engine: "2.0" },
];

app.get("/data", (req, res) => {
  res.json(data);
});

app.post("/addItem", (req, res) => {
  const { name, cylinder, engine } = req.body;
  const item = { name, cylinder, engine };

  data.push(item);

  res.json({ success: true });
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
