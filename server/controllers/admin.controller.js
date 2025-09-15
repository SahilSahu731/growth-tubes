import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Check if credentials match admin env variables
    if (email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD) {
      return res.status(401).json({ message: "Invalid admin credentials" });
    }
    
    // Find or create admin user
    let admin = await User.findOne({ email: process.env.ADMIN_EMAIL });
    
    if (!admin) {
      const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
      admin = new User({
        username: "admin",
        email: process.env.ADMIN_EMAIL,
        password: hashedPassword,
        role: "admin"
      });
      await admin.save();
    } else {
      // Ensure existing user has admin role
      if (admin.role !== "admin") {
        admin.role = "admin";
        await admin.save();
      }
    }
    
    const token = jwt.sign(
      { id: admin._id, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    
    console.log('Admin login response:', {
      id: admin._id,
      username: admin.username,
      email: admin.email,
      role: admin.role
    });
    
    res.status(200).json({
      message: "Admin login successful",
      token,
      user: {
        id: admin._id,
        username: admin.username,
        email: admin.email,
        role: admin.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};