import User from "../models/User.js";

// API Controller to fetch user data
export const getUserData = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await User.findById(userId).populate("favorites");

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Toggle Favorite Movie
export const toggleFavorite = async (req, res) => {
  try {
    const { userId, movieId } = req.body;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const isFavorite = user.favorites.includes(movieId);

    if (isFavorite) {
      user.favorites = user.favorites.filter((id) => id.toString() !== movieId);
    } else {
      user.favorites.push(movieId);
    }

    await user.save();
    res.json({ success: true, message: isFavorite ? "Removed from favorites" : "Added to favorites" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
