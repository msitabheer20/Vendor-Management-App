import jwt from 'jsonwebtoken'
import Vendor from '../models/vendor.js'

const authMiddleware = async (req, res, next) => {

    const authHeader = req.header("Authorization")
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Access Denied! No token provided." });
    };

    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) {
            console.error("JWT Verification Error:", err);
            return res.status(401).json({ message: "Token Expired Please sigin again" });
        }

        req.vendor = await Vendor.findById(decoded.id).select("-password");

        if (!req.vendor) {
            return res.status(404).json({ message: "Vendor not found" });
        }

        next();
    });
};

export default authMiddleware;
