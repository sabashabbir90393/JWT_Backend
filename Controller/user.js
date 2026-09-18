import { signJWT, verifyJWT } from "../Utils/jwt.js";
import User from "../model/user.js";
import { hashPassword, comparePassword } from "../Utils/bcrypt.js";


// ==================== LOGIN ====================

export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        error: "Username and password required",
      });
    }

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({
        error: "Invalid credentials",
      });
    }

    const isPasswordValid = await comparePassword(
      password,
      user.password
    );

    if (!isPasswordValid) {
      return res.status(401).json({
        error: "Invalid credentials",
      });
    }

    const token = signJWT({
      username: user.username,
      id: user._id,
    });

    res.status(200).json({
      token,
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: "Internal Server Error",
    });
  }
};


// ==================== SIGNUP ====================

export const createUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        error: "Username and password required",
      });
    }

    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(409).json({
        error: "Username already exists",
      });
    }

    const encryptedPassword = await hashPassword(password);

    const newUser = new User({
      username,
      password: encryptedPassword,
    });

    await newUser.save();

    // Create JWT immediately after signup
    const token = signJWT({
      username: newUser.username,
      id: newUser._id,
    });

    res.status(201).json({
      message: "User created successfully",
      token,
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: "Internal Server Error",
    });
  }
};


// ==================== VERIFY TOKEN ====================

export const verifyUser = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        error: "Token required",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = verifyJWT(token);

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({
        error: "User not found",
      });
    }

    res.status(200).json({
      valid: true,
      user,
    });

  } catch (error) {
    return res.status(401).json({
      valid: false,
      error: "Invalid or expired token",
    });
  }
};