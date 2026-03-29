import express from "express"
import { getOtherUsers, login, logout, register } from "../controllers/userController.js"
import isAuthenticated from "../middleware/isAuthenticated.js"

const router = express.Router()

router.route("/register").post(register)
router.route("/login").post(login)
router.route("/logout").get(logout)
router.route("/").get(isAuthenticated, getOtherUsers)
router.get("/me", isAuthenticated, (req, res) => {
    return res.status(200).json(req.id); // your auth middleware sets req.user
});

export default router