import express from 'express'
import axios from 'axios'

const router = express.Router();

router.get("/", async (req, res) => {
    const { vendorName, url, token } = req.query;
    if (!url || !token) {
        return res.status(400).json({ error: "Missing URL or token" });
    }

    try {
        const response = await axios.get(`https://${url}/admin/api/2025-01/products.json?vendor=${encodeURIComponent(vendorName)}`, {
            headers: {
                "X-Shopify-Access-Token": token,
                "Content-Type": "application/json",
            },
        });

        // console.log(response.data);
        res.status(200).json(response.data);
    } catch (error) {
        console.error("Error fetching products data:", error.response?.data || error.message);
        res.status(500).json({ error: "Failed to fetch products data" });
    }
})


export default router;