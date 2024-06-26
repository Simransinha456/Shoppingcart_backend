import express from "express";
import mongoose from "mongoose";
import { ProductsModel } from "../models/ProductModel.js";
import { UserModel } from "../models/Users.js";
import verifyToken from "./verifyToken.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const result = await ProductsModel.find({});
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create a new recipe
router.post("/", async (req, res) => {
  const recipe = new ProductsModel({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    image: req.body.image,
    ingredients: req.body.ingredients,
    imageUrl: req.body.imageUrl,
    userOwner: req.body.userOwner,
  });

  try {
    const result = await recipe.save();
    res.status(201).json({
      createdRecipe: {
        name: result.name,
        image: result.image,
        ingredients: result.ingredients, 
        instructions: result.instructions,
        _id: result._id,
      },
    });
  } catch (err) {
    // console.log(err);
    res.status(500).json(err);
  }
});

// Save a Recipe
router.put("/", verifyToken, async (req, res) => {
  const recipe = await ProductsModel.findById(req.body.recipeID);
  const user = await UserModel.findById(req.body.userID);
  try {
    user.savedRecipe.push(recipe);
    await user.save();
    res.status(201).json({ savedRecipe: user.savedRecipe });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get a recipe by ID
router.get("/:recipeId", async (req, res) => {
  try {
    const result = await ProductsModel.findById(req.params.recipeId);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get id of saved recipes
router.get("/savedRecipes/ids/:userId", async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.userId);
    res.status(201).json({ savedRecipe: user?.savedRecipe });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Get saved recipes
router.get("/savedRecipes/:userId", async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.userId);
    const savedRecipes = await ProductsModel.find({
      _id: { $in: user.savedRecipe },
    });

    res.status(201).json({ savedRecipes });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.put("/remove/:userId/:recipeId", async (req, res) => {
  try {
    const id = req.params.userId;
    const recipeid = req.params.recipeId;
    const updatedUser = await UserModel.findByIdAndUpdate(id, { $pull: { savedRecipe: recipeid } }, { new: true });
    res.json(updatedUser);

  } catch (error) {
    return res.json(error);
  }
})

export { router as productsrouter };
