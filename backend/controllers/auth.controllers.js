import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateToken.js";
export const Signup = async (req, res) => {
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "password don't match" });
    }

    const user = await User.findOne({ username });

    if (user) {
      return res.status(400).json({ Error: "username already exist" });
    }

    //HASHING the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePic = ` https://avatar.iran.liara.run/public/girl?username=${username}`;

    const newUser = new User({
      fullName,
      username,
      password: hashedPassword,
      gender,
      profilePic: gender == "male" ? boyProfilePic : girlProfilePic,
    });

    if (newUser) {
      // console.log("break");
      generateTokenAndSetCookie(newUser._id, res);
      await newUser.save();

      res.status(201).json({
        message: "User created successfully",
        _id: newUser._id,
        fullName: newUser.fullName,
        username: newUser.username,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({ error: "invalid User data" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error while signing up" });
  }
};
export const Login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user?.password || " "
    );

    if (!user || !isPasswordCorrect) {
      return res.status(400).json({ error: "Invalid username or password" });
    }

    console.log("check");
    generateTokenAndSetCookie(user._id, res);

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      username: user.username,
      profilePic: user.profilePic,
    });
  } catch (error) {
    res.status(500).json({ error: "Error while logging in" });
  }
};

export const Logout = async (req, res) => {
  try {
    res.cookie("jwt", " ", { maxAge: 0 });
    res.status(200).json({ message: "logged out successfully" });
  } catch (error) {
    res.status(500).json({ error: "error while logging out" });
  }
};
