import { Shop } from "../models/shop.models.js";
import { uploadImage } from "../utils/cloudinary.js";

export const createOrEditShop = async (req, res) => {
  try {
    const { name, city, state, address } = req.body;

    let image;

    if (req.file) {
      image = await uploadImage(req.file.path);
    }

    // a user can create only one shop

    let shop = await Shop.findOne({ owner: req.user._id });

    if (!shop) {
      shop = await Shop.create({
        name,
        city,
        state,
        address,
        image,
        owner: req.user._id,
      }).populate("owner");
    } else {
      shop = await Shop.findByIdAndUpdate(
        shop._id,
        {
          name,
          city,
          state,
          address,
          image,
          owner: req.user._id,
        },
        { new: true },
      );
    }

    return res
      .status(201)
      .json({ message: "shop has been created successfully", shop });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};
