import Car from "../models/Car.js";

export const getallCar = async (req, res) => {
  try {
    const cars = await Car.find();
    res.status(200).json({ success: true, cars });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getOneCar = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    res.status(200).json({ success: true, car });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const addCar = async (req, res) => {
  try {
    const { name, year, model, price } = req.body;

    if (!name || !year || !model || !price) {
      return res
        .status(400)
        .json({ success: false, message: "ყველა ველი სავალდებულოა" });
    }

    const car = await Car.create(req.body);

    res.status(201).json({ success: true, message: "წარმატებით დაემატა", car });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteCar = async (req, res) => {
  try {
    const userId = req.params.id;
    
    const deletedCar=await Car.findByIdAndDelete(userId)

    res.status(200).json({success:true,deletedCar})
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
