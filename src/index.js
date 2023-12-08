import express from "express"
import cors from "cors"
import mongoose from "mongoose"

import { userRouter } from './routes/users.js'

const app = express()

//middlwares 
app.use(express.json()); 
app.use(cors());

app.use("/auth", userRouter); 



// mongoose.connect("mongodb+srv://simransinha:MERNpassword@recipes.xrnkcsc.mongodb.net/recipes?retryWrites=true&w=majority");
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

   
