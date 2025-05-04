import mongoose from "mongoose";

const carSchema = new mongoose.Schema({
  name: { type: String, required: [true, "სახელი აუცილებელია"] },
  year: Number,
  model: String,
  price: Number,
});

const Car = mongoose.model("Car", carSchema);
export default Car;
