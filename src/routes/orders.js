import express from "express";
import mongoose from "mongoose";
import { RecipesModel } from "../models/Recipes.js";
import { UserModel } from "../models/Users.js";
import verifyToken from "../routes/verifyToken.js";

const router = express.Router();

// router.get("/", async (req, res) => {
//   try {
//     const result = await RecipesModel.find({});
//     res.status(200).json(result);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });
// Save a Recipe

router.get("/:userId", async (req, res) => {
    try {
        const id = req.params.userId;
        if (!id) {
            res.status(400).json({ message: "User ID is required" });
        }

        const user = await UserModel.findById(id).populate("orders");
        res.status(200).json({data:user.orders});
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post("/", async (req, res) => {
    try {
        const { recipeID, userID } = req.body;
        const user = await UserModel.findById(userID);
        if (user) {
          user.orders.push(recipeID);
          user.savedRecipe.pull(recipeID);
          await user.save();
          console.log(user)
          res.status(201).json(user);
        } else {
          res.status(404).json({ message: "User not found" });
        }
      }
    
      catch (error) {
        res.status(500).json({ message: error.message });
      }
});


export { router as orderRouter };
