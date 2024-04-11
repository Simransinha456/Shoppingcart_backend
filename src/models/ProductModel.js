import mongoose from "mongoose"
const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    ingredients: [{
        type: String,
        required: true
    }],
    imageUrl: {
        type: String,
        required: true
    },
    userOwner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users", required: true,
    },
});

export const ProductsModel = mongoose.model("recipe", ProductSchema); 