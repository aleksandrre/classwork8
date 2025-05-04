import express from "express";

import {
  addCar,
  deleteCar,
  getallCar,
  getOneCar,
} from "../controllers/carCoontroller.js";

const router = express.Router();

router.get("/", getallCar);
router.get("/:id", getOneCar);
router.post("/addCar", addCar);
router.delete("/deleteCar/:id", deleteCar);

export default router;
