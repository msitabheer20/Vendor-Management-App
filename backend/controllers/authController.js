import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Vendor from "../models/vendor.js";
import dotenv from "dotenv";

dotenv.config();

export const handleSignUp = async (req, res) => {
    const { name, email, password, isAdmin, businessName, storeUrl, accessToken, phone, address } = req.body;

    try {
        const existingVendor = await Vendor.findOne({ email });
        if (existingVendor) return res.status(400).json({ message: "Vendor already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);
        const newVendor = new Vendor({
            name,
            email,
            password: hashedPassword,
            businessName,
            phone,
            address,
            isAdmin,
            ...(isAdmin && { storeUrl, accessToken })
        });

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
        if (!vendor.isApproved) return res.status(403).json({ message: "Awaiting admin approval" });

        const isMatch = await bcrypt.compare(password, vendor.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign({ id: vendor._id, isAdmin: vendor.isAdmin }, process.env.JWT_SECRET, { expiresIn: "1h" });

        const responseData = {
            token,
            vendor: {
                id: vendor._id,
                name: vendor.name,
                email: vendor.email,
                isAdmin: vendor.isAdmin,
                businessName: vendor.businessName,
                phone: vendor.phone,
                address: vendor.address
            }
        };

        if (vendor.isAdmin) {
            responseData.vendor.storeUrl = vendor.storeUrl;
            responseData.vendor.accessToken = vendor.accessToken;
        }

        res.json(responseData);

    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}