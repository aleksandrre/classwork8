import User from "../models/User.js";
import bcrypt from "bcrypt";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "შეავსეთ ყველა ველი" });
    }
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "ასეთი მეილი უკვე დარეგისტრირებულია",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      email,
      password: hashedPassword,
    });
    await user.save();
    res
      .status(201)
      .json({ success: true, message: "წარმატებით გაიარეთ რეგისტრაცია" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: "სერვერის შეცდომა" });
  }
};
