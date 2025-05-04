import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import userRouter from "./routes/userRoute.js";
import carRouter from "./routes/carRoute.js";

const app = express();

//middlewares
app.use(cors());
app.use(express.json());

app.use("/user", userRouter);
app.use("/car", carRouter);

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
