import express from "express"
import cors from "cors"
import mongoose from "mongoose"

import { userRouter } from './routes/users.js'
import { recipesRouter } from './routes/recipes.js'

const app = express()

//middlwares 
app.use(express.json()); 
app.use(cors()); 

app.get("/", (req, res) => {
  res.send("Api Working");
});
app.use("/auth", userRouter); 
app.use("/recipes", recipesRouter);



const connect = async () => {
    try {
      await mongoose.connect("mongodb+srv://simransinha:MERNpassword@recipes.xrnkcsc.mongodb.net/recipes?retryWrites=true&w=majority");
      console.log("Connected To MongoDB.");
    } catch (error) {
      throw error;
    }
  };
connect();

app.listen(8000, ()=>{
    console.log("SERVER STARTED")
})   

   
