import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());
const data = [];

app.get("/data", (req, res) => {
  try {
    res.json(data);
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ success: false, message: "შიდა შეცდომა" });
  }
});

app.post("/addItem", (req, res) => {
  try {
    const { name, email, password } = req.body;

    const item = { name, email, password };

    data.push(item);

    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ success: false, message: "შიდა შეცდომა" });
  }
});

app.listen(3001, () => {
  console.log("სერვერი დაისტარტა 3001 პორტზე");
});
