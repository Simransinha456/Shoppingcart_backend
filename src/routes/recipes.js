import express from 'express'
import mongoose from 'mongoose';
import { RecipeModel } from "../models/Recipes.js";
import { UserModel } from '../models/Users.js';

const router = express.Router();

//to post new recipe
router.post("/", async (req, res) => {
    const recipe = new RecipeModel(req.body);
    try {
        const response = await recipe.save();
        // console.log(response)
        res.json({ message: "success" });
    } catch (error) {
        console.log("error", error)
        return res.json({ message: "error aa gya" });
    }
});

//to get all the recipe
router.get("/", async (req, res) => {
    try {
        const response = await RecipeModel.find({})
        res.json(response);
    } catch (error) {
        res.json(error);
    }
})

//get perticular recipe
router.get("/:id", async (req, res) => {
    try {
        const response = await RecipeModel.findById(req.params.id);
        res.json(response);
    } catch (error) {
        return res.json(error);
    }
});

// update the saved recipe
router.put("/:userId", async (req, res) => {
    try {
        const id = req.params.userId;
        console.log(req.body)
        const recipe = await RecipeModel.findById(req.body.recipeID);
        const user = await UserModel.findByIdAndUpdate(id, { $push: { savedRecipe: recipe } }, { new: true });

        res.json(user);
    } catch (error) {
        return res.json(error);
    }
});


// router.get("/savedRecipe/:userID", async (req, res) => {
//     try {
//         const user = await UserModel.findById(req.params.userID);
//         const savedRecipe = await RecipeModel.find({
//             _id: { $in: user.savedRecipe },
//         });
//         res.json(savedRecipe);
//     } catch (error) {
//         res.json(error);
//     }
// });
// router.get("/savedRecipe/ids/:userID", async (req, res) => {
//     try {
//         const user = await UserModel.findById(req.params.userID);
//         res.json({ savedRecipe: user?.savedRecipe });
//     } catch (error) {
//         res.json(error);
//     }
// })
// // to update the particulat recipe
// router.put("/:userId", async (req, res) => {
//     try {
//         const id = req.params.userId;
//         const recipe = await RecipeModel.findById(req.body.recipeID);
//         const user = await UserModel.findByIdAndUpdate(id, { $push: { savedRecipe: recipe } }, { new: true });

//         res.json(user);
//     } catch (error) {
//         return res.json(error);
//     }
// });
// // router.put("/", async (req, res) => {
// //     try {
// //         const recipe = await RecipeModel.findById(req.body.recipeID);
// //         const user = await UserModel.findById(req.body.userID);
// //         user.savedRecipes.push(recipe);
// //         await user.save();
// //         res.json({ savedRecipes: user.savedRecipes });
// //     } catch (error) {
// //         res.json(error);
// //     }
// // })

// router.get("/savedRecipes/ids", async (req, res) => {
//     try {
//         const user = await UserModel.findById(req.body.userID);
//         res.json({ savedRecipes: user?.savedRecipes });
//     }
//     catch (error) {
//         res.json(error);
//     }
// })


// router.get("/savedRecipes/ids", async (req, res) => {
//     try {
//         const user = await UserModel.findById(req.body.userID);
//         const savedRecipes = await RecipeModel.find({
//             _id: { $in: user.savedRecipes },
//         });
//         res.json({ savedRecipes });
//     }
//     catch (error) {
//         res.json(error);
//     }
// })
export { router as recipeRouter }

