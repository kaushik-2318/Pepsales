import User from '../models/User.js';

export const createUser = async (req, res) => {
    try {
        const { username, name, email, phone } = req.body;

        if (!username || !name || !email || !phone) {
            return res.status(400).json({ success: false, error: "All fields are required" });
        }

        const existingUser = await User.findOne({ userId: username });

        if (existingUser) {
            return res.status(400).json({ success: false, error: "User already exists" });
        }

        const existingEmail = await User.findOne({ email });

        if (existingEmail) {
            return res.status(400).json({ success: false, error: "Email already exists" });
        }

        const existingPhone = await User.findOne({ phone });

        if (existingPhone) {
            return res.status(400).json({ success: false, error: "Phone already exists" });
        }

        await User.create({ userId: username, name, email, phone });

        res.status(200).json({ success: true });
    } catch (error) {
        console.error("Controller Error:", error.message);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
};
