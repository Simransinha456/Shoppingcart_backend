import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    savedRecipe: [{ type: mongoose.Schema.Types.ObjectId, ref: "recipe" }],
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "recipe" }],
}, {timestamps:true});

export const UserModel = mongoose.model("user", UserSchema);  