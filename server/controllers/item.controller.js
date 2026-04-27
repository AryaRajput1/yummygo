import { Item } from "../models/item.model.js";
import { Shop } from "../models/shop.models.js";
import { uploadImage } from "../utils/cloudinary";

export const addItem = async (req, res) => {
  try {
    const { name, category, price, foodType } = req.body;
    let image;

    if (req.file) {
      image = await uploadImage(req.file.path);
    }

    const shop = await Shop.findOne({ owner: req.user._id });

    if (!shop) {
      return res
        .status(404)
        .json({ message: 'shop doesn"t exists. You cannot add/create item' });
    }

    const item = await Item.create({
      name,
      image,
      category,
      shop,
      price,
      foodType,
    });

    return res
      .status(201)
      .json({ message: "Item created/added successfully.", item });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

export const updateItem = async (req, res) => {
  try {
    const itemId = req.params.id;
    const { name, category, price, foodType } = req.body;
    let image;

    if (req.file) {
      image = await uploadImage(req.file.path);
    }

    const item = await Item.findByIdAndUpdate(
      itemId,
      {
        name,
        image,
        category,
        price,
        foodType,
      },
      { new: true },
    );

    if (!item) {
      return res
        .status(404)
        .json({ message: 'Item doesn"t exists. You cannot update item' });
    }

    return res
      .status(200)
      .json({ message: "Item updated successfully.", item });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};
