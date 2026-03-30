import express from "express"
import { getOtherUsers, login, logout, register } from "../controllers/userController.js"
import isAuthenticated from "../middleware/isAuthenticated.js"
import { User } from "../models/userModel.js"

const router = express.Router()

router.route("/register").post(register)
router.route("/login").post(login)
router.route("/logout").get(logout)
router.route("/").get(isAuthenticated, getOtherUsers)
router.get("/me", isAuthenticated, async (req, res) => {
    try {
        const user = await User.findById(req.id).select("-password") // ✅ exclude password
        if (!user) return res.status(404).json({ message: "User not found" })
        return res.status(200).json(user)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal server error" })
    }
});

export default router