import { User } from "../models/userModel"

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
                const maleProfilePhoto = `https://api.dicebear.com/9.x/lorelei/svg?username=${userName}`
                const femaleProfilePhoto = `https://api.dicebear.com/9.x/avataaars/svg?seed=Milo?username=${userName}`

                await User.create({
                    fullName,
                    userName,
                    password:hashedPassword,
                    profilePhoto:gender===male? maleProfilePhoto:femaleProfilePhoto
                    gender
                })
    } catch (error) {
        
    }
    
}