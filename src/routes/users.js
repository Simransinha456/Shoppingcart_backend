import express from "express"; 
import jwt from "jsonwebtoken"; 
import bcrypt from "bcrypt"; 
import { UserModel } from "../models/Users.js";
import dotenv from "dotenv"; 

dotenv.config();
const router = express.Router(); 

router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  const user = await UserModel.findOne({ username });
  //check if users exists or not
  if (user) {
    return res.json({ message: "User already exists" });
  }
  //hashing the password
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new UserModel({ username, password: hashedPassword });
  await newUser.save();
  res.json({ message: "User successfully registered" });
});

// routing of login------------ 
router.post("/login", async (req, res) => {  
  const { username, password } = req.body; 
  const user = await UserModel.findOne({ username });

  if (!user) {
    return res.json({ message: "User doesn't exists" });
  }
  //if it is valid its comes true and if not valid then comes false
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.json({ message: "User or password is incorrect" });
  }

  //--------------check for expiry 
  const currentDate = new Date(); 
  const diffInMilliseconds = Math.abs(currentDate - user.createdAt);
    const diffInDays = Math.ceil(diffInMilliseconds / (1000 * 60 * 60 * 24));
    const passwordExpIn = 28 - diffInDays;

    // console.log(`Password has been created ${diffInDays} ,${passwordExpIn} days ago`);

    if (passwordExpIn <= 1) {
      await sendEmail(
        user.email,
        "Password Reset",
        "Please reset your password"
      );
    }

  const token = jwt.sign({ id: user._id || null }, "secret");
  res.json({ message: "Login success", token, userID: user._id || null, passwordExpIn });
});
export { router as userRouter }; 


