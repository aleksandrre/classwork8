import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: [true, "სახელი აუცილებელია"] },
  email: String,
  password: String,
});

const User = mongoose.model("User", userSchema);
export default User;
