import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());
const data = [];

app.get("/data", (req, res) => {
  res.json(data);
});

app.post("/addItem", (req, res) => {
  const { name, email, password } = req.body;

  const item = { name, email, password };

  data.push(item);
  res.status(200).json({ success: true });
});

app.listen(3001, () => {
  console.log("სერვერი დაისტარტა 3001 პორტზე");
});
