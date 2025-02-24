

export const getVedorDetails = async (req, res) => {
    try {
        const vendor = req.vendor;
        console.log(vendor);
        res.json(vendor);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};