

export const getVedorDetails = async (req, res) => {
    try {
        const vendor = req.vendor;
        res.json(vendor);
    } catch (error) {
        console.error("Error getting vendor: ",error);
        res.status(500).json({ message: "Server error" });
    }
};