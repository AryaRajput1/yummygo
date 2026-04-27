import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    shop: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shop",
      required: true,
    },
    category: {
      type: String,
      enum: [
        "Pizza",
        "Burger",
        "Sandwich",
        "Pasta",
        "Noodles",
        "Rice Bowl",
        "Biryani",
        "Rolls & Wraps",
        "Fries",
        "Salad",
        "Soup",
        "Dessert",
        "Beverage",
      ],
      required: true,
    },
    price: {
      type: Number,
      min: 0,
      required: true,
    },
    foodType: {
      type: String,
      enum: ["Veg", "NonVeg"],
    },
  },
  {
    timestamps: true,
  },
);

export const Item = mongoose.model("Item", itemSchema);
