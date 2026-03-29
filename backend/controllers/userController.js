import { User } from "../models/userModel.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const register =  async (req, res) => {
    try {
        const {fullName, userName, password, confirmPassword, gender} = req.body
        if (!fullName || !userName || !password || !confirmPassword || !gender) {
            return res.status(400).json({
                message:"All fields are required"
            })
        }
        if (password !== confirmPassword) {
             return res.status(400).json({
                message:"Password not matched"
            })
        }     // CHECK AND CREATE NEW USER:
            const user = await User.findOne({userName})
            if (user) { 
                return res.status(400).json({
                    message:"User already exists"})
                }
                const hashedPassword = await bcrypt.hash(password, 10)
                // Fetch Profile photo:
                const maleProfilePhoto = `https://api.dicebear.com/9.x/lorelei/svg?username=${userName}&hair=variant01,variant02,variant03`
                const femaleProfilePhoto = `https://api.dicebear.com/9.x/avataaars/svg?seed=Milo?username=${userName}`

                await User.create({
                    fullName,
                    userName,
                    password:hashedPassword,
                    profilePhoto:gender==="male"? maleProfilePhoto : femaleProfilePhoto,
                    gender
                })
                return res.status(200).json({
                    message:"Account created succesfully",
                    success:true
                })
    } catch (error) {
        console.log(error);
        
    }}

export const login = async (req, res) => {
    try {
        const {userName, password} = req.body
        if (!userName || !password) {
            return res.status(400).json({
                message:"All parameters required to be filled",
                success:false
            })
        }
        const user = await User.findOne({userName})
        if (!user) {
            return res.status(400).json({
                message:"Invalid credentials",
                success:false
            })
        }
            const  isPasswordMatch = await bcrypt.compare(password, user.password)
            if (!isPasswordMatch) {
                return res.status(400).json({
                message:"Invalid credentials",
                success:false
            })
            }
            const tokenData = {
                userId: user._id
            }
            const token = await  jwt.sign(tokenData, process.env.JWT_SECRET_KEY, {expiresIn: '1d'})
            
            return res.status(200).cookie("token", token, {maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly:true, sameSite:'lax', secure:false,}).json({
                _id:user._id,
                userName:user.userName,
                fullName:user.fullName,
                profilePhoto:user.profilePhoto
            });


    } catch (error) {
        console.log(error);
        
        
    }
    
}

export const logout = async (req, res) => {
    try {
      return res.status(200).cookie("token", "", {maxAge:0}).json({
        message:"logged out successfully"
      })
    } catch (error) {
        console.log(error);
               
    }
}

export const getOtherUsers = async (req, res) => {
    try {
        const loggedInUserId = req.id
        const otherUsers = await User.find({_id:{$ne:loggedInUserId}}).select("-password")
        return res.status(200).json(otherUsers)
    } catch (error) {
        console.log(error);
    }
}

export const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.id).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json(user);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

  
