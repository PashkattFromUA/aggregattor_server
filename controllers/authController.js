import User from "../models/userModel.js";

export const login = async (req, res) => {
  try {
    const { email, password: pass } = req.body;
    console.log(req.body);
    const user = await User.findOne({ email });
    console.log(user);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isValid = pass === user.password;

    if (!isValid) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const { password, ...userData } = user._doc;

    res.status(200).json(userData);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: e.message });
  }
};
