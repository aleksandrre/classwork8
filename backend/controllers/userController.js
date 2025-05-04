import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
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

export const login = async (req, res) => {
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

    const token = jwt.sign(
      { userId: existingUser._id, name: existingUser.name },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res
      .status(200)
      .json({ success: true, message: "თქვენ წარმატებით შეხვედით ", token });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: "სერვერის შეცდომა" });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const AllUser = await User.find();
    console.log(req.user);

    res.status(200).json({ success: true, data: AllUser });
  } catch (err) {
    res.status(500).json({ sucess: false, message: "სერვერის შეცდომა" });
  }
};

export const getOneUser = async (req, res) => {
  try {
    
    const { id } = req.params;

    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "სახელი არ არის მოწოდებული" });
    }
    const user = await User.findById(id);
    res.status(200).json({ success: true, user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "სერვერის შეცდომა" });
  }
};
