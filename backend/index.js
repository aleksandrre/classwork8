import express from "express";
import cors from "cors";

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
});
