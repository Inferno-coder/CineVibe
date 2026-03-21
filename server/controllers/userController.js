import User from "../models/User.js";

// API Controller to fetch user data
export const getUserData = async (req, res) => {
  try {
    const { userId } = req.body;
    console.log("Fetching data for userId:", userId);
    const user = await User.findById(userId);

    if (!user) {
      console.log("User not found in database for ID:", userId);
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.json({ success: true, user });
  } catch (error) {
    console.log("Get User Data Error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};
