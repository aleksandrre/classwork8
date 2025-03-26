import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());
const users = [];

app.post("/register", (req, res) => {
  try {
    const { name, email, password } = req.body;

    if(!name || !email || !password){
      return res.status(400).json({ success: false, message: "ყველა ველი სავალდებულოა" });
    }  
    
    const existingUser = users.find(user => user.email === email)

    if (existingUser) {
      return res.status(400).json({ success: false, message: "ესეთი Email-ის მქონე მომხმარებელი უკვე არსებობს" });
    }

    users.push({ name, email, password})

    res.status(200).json({ success: true, message: "რეგისტრაცია წარმატებით განხორციელდა" });
    
    // data.push(item);

    // res.status(200).json({ success: true });
  } catch (error) {
    console.error(error.message);
    res.status(404).json({ success: false, message: "შიდა შეცდომა" });
  }
});

app.post("/login", (req, res) => {
  try {
    const { email, password} = req.body;

    const checkUser = users.find(user => user.email === email && user.password === password)

    if(!checkUser){
      return res.status(400).json({success: false, message: "შესვლა წარუმატებლად განხორციელდა"})
    }

    res.status(200).json("ოპერაცია წარმატებით განხორციელდა")

  } catch (error) {
    console.error(error.message);
    res.status(404).json({ success: false, message: "შიდა შეცდომა" });
  }
})

app.listen(3001, () => {
  console.log("სერვერი დაისტარტა 3001 პორტზე");
});
