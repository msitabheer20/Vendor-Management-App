import jwt from 'jsonwebtoken'
import vendor from '../models/vendor.js';

const authMiddleware = async (req, res, next) => {

    const token = req.header("Authorization")?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Access Denied! No token provided." });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.vendor = await vendor.findById(decoded.id).select("-password");

        if (!req.vendor) {
            return res.status(404).json({ message: "Vendor not found" });
        }

        next();

    } catch (error) {
        console.error("JWT Verification Error:", error);
        res.status(401).json({ message: "Invalid Token" });
    }
};

export default authMiddleware;
