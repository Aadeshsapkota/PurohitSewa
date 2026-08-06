import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../utils/prisma.js";

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

// Generate Tokens
const generateAccessToken = (user) => {
  return jwt.sign(
    {
      userId: user.id,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "15m",
    }
  );
};

const generateRefreshToken = (user) => {
  return jwt.sign(
    {
      userId: user.id,
    },
    process.env.JWT_REFRESH_SECRET,
    {
      expiresIn: "7d",
    }
  );
};

// REGISTER
export const register = async (req, res) => {
  try {
    let { username, password } = req.body;

    username = username?.trim();

    if (!username || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    if (username.length < 3) {
      return res.status(400).json({
        message: "Username must be at least 3 characters",
      });
    }

    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message:
          "Password must contain uppercase, lowercase, number and special character.",
      });
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (existingUser) {
      return res.status(400).json({
        message: "Username already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
      },
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
    });

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// LOGIN
export const login = async (req, res) => {
  try {
    let { username, password } = req.body;

    username = username?.trim();

    if (!username || !password) {
      return res.status(400).json({
        message: "Username and Password required",
      });
    }

    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (!user) {
      return res.status(401).json({
        message: "Invalid username or password",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid username or password",
      });
    }

    if (user.role !== "SUPERADMIN") {
      return res.status(403).json({
        message: "Access denied! Admin only.",
      });
    }

    const accessToken = generateAccessToken(user);

    const refreshToken = generateRefreshToken(user);

    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        refreshToken: hashedRefreshToken,
      },
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      message: "Login successful",
      accessToken,
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
      },
    });

  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

// REFRESH TOKEN
export const refresh = async (req, res) => {
  try {
    const token = req.cookies.refreshToken;

    if (!token) {
      return res.status(401).json({ message: "Refresh token missing" });
    }

    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    });

    if (!user || !user.refreshToken) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const valid = await bcrypt.compare(token, user.refreshToken);

    if (!valid) {
      // Clear compromised cookie immediately on invalid match
      res.clearCookie("refreshToken");
      return res.status(401).json({ message: "Invalid refresh token" });
    }

    // Token Rotation Mechanics
    const newAccessToken = generateAccessToken(user);
    const newRefreshToken = generateRefreshToken(user);
    const hashed = await bcrypt.hash(newRefreshToken, 10);

    // Save the new hashed refresh token to the DB
    await prisma.user.update({
      where: { id: user.id },
      data: { refreshToken: hashed },
    });

    // 1. Send the long-lived refresh token via HTTP-Only Cookie
    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // True in prod, false in dev
      sameSite: "strict", // Blocks CSRF entirely
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 Days
    });

    // 2. Return short-lived access token directly in the JSON body (Safe from XSS)
    return res.status(200).json({
      success: true,
      accessToken: newAccessToken,
    });

  } catch (err) {
    // If token expired or verification failed, clear cookie and exit
    res.clearCookie("refreshToken");
    return res.status(401).json({ message: "Refresh token expired or invalid" });
  }
};


// LOGOUT
export const logout = async (req, res) => {
  try {

    const token = req.cookies.refreshToken;

    if (token) {

      try {

        const decoded = jwt.verify(
          token,
          process.env.JWT_REFRESH_SECRET
        );

        await prisma.user.update({
          where: {
            id: decoded.userId,
          },
          data: {
            refreshToken: null,
          },
        });

      } catch { }

    }

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.json({
      success: true,
      message: "Logout successful",
    });

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};