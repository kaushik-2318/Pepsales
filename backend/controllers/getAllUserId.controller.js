import User from '../models/User.js';

export const getUserId = async (req, res) => {
    try {
        const user = await User.find();
        res.status(200).json(user);
    } catch (error) {
        console.error("Controller Error:", error.message);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
};
