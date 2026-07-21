import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../utils/prisma.js";

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

// REGISTER
export const register = async (req, res) => {
  try {
    let { username, password } = req.body;

    // Trim
    username = username?.trim();

    // Empty validation
    if (!username || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // Name validation
    if (username.length < 3) {
      return res.status(400).json({
        message: "Name must be at least 3 characters",
      });
    }

    // Password validation
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message:
          "Password must contain 8+ chars, uppercase, lowercase, number and special character",
      });
    }

    const existingUser = await prisma.user.findUnique({
      where: { username },
    });

    if (existingUser) {
      return res.status(400).json({
        message: "Username already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
      },
      select: {
        id: true,
        username: true,
        role: true,
        createdAt: true,
      },
    });

    return res.status(201).json({
      message: "User registered successfully",
      username,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: err.message,
    });
  }
};

// LOGIN
export const login = async (req, res) => {
  try {
    let { username, password } = req.body;

    // Empty validation
    if (!username || !password) {
      return res.status(400).json({
        message: "username and password are required",
      });
    }

    const user = await prisma.user.findUnique({
      where: { username },
    });

    // Security: same message for username/password
    if (!user) {
      return res.status(401).json({
        message: "Invalid username or password",
      });
    }

    // ✅ FIXED: compare with user.password (hashed)
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid username or password",
      });
    }

    const token = jwt.sign(
      {
        userId: user.id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};
