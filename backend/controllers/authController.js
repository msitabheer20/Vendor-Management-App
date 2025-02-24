import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Vendor from "../models/vendor.js";
import dotenv from "dotenv";

dotenv.config();

export const handleSignUp = async (req, res) => {
    const { name, email, password, businessName, storeUrl, phone, address } = req.body;

    try {
        const existingVendor = await Vendor.findOne({ email });
        if (existingVendor) return res.status(400).json({ message: "Vendor already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);
        const newVendor = new Vendor({ name, email, password: hashedPassword, businessName, storeUrl, phone, address });

        await newVendor.save();
        res.status(201).json({ message: "Vendor registered successfully" });

    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}

export const handleSignin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const vendor = await Vendor.findOne({ email });
        if (!vendor) return res.status(400).json({ message: "Vendor not found" });

        const isMatch = await bcrypt.compare(password, vendor.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        // console.log("JWT_SECRET:", process.env.JWT_SECRET);
        const token = jwt.sign({ id: vendor._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.json({
            token,
            vendor: {
                id: vendor._id,
                name: vendor.name,
                email: vendor.email,
                businessName: vendor.businessName,
                storeUrl: vendor.storeUrl,
                phone: vendor.phone,
                address: vendor.address
            }
        });

    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}