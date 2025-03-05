import Vendor from "../models/vendor.js";

export const getVedorDetails = async (req, res) => {
    try {
        const vendor = req.vendor;
        res.json(vendor);
    } catch (error) {
        console.error("Error getting vendor: ",error);
        res.status(500).json({ message: "Server error" });
    }
};

export const getPendingUsers = async (req, res) => {
    try {
        const users = await Vendor.find({isApproved: false});
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
}

export const approveVendor = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await Vendor.findByIdAndUpdate(id, { isApproved: true }, { new: true });
        res.json({ message: "User Approved", user });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
}

export const rejectVendor = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await Vendor.findByIdAndDelete({ _id: id });
        res.json({ message: "User Deleted" });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
}