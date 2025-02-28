import axios from 'axios'
import Shopify from 'shopify-api-node';

export const getProducts = async (req, res) => {
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
}

export const createProduct = async (req, res) => {
    try {
        const { shopName, shopToken, ...productDetails } = req.body;

        const SHOPIFY_API_URL = `https://${shopName}/admin/api/2025-01/products.json`;

        const productData = {
            product: {
                title: productDetails.title,
                body_html: productDetails.description,
                vendor: productDetails.vendor,
                product_type: productDetails.productType,
                tags: productDetails.tags,
                category: productDetails.category,
                variants: [
                    {
                        price: productDetails.price,
                        sku: productDetails.sku,
                        barcode: productDetails.barcode,
                        inventory_quantity: productDetails.inventory,
                        weight: productDetails.weight,
                        weight_unit: productDetails.weightUnit,
                        cost: productDetails.costPerItem,
                    },
                ],
                images: productDetails.images,
                status: productDetails.status.toLowerCase(),
            },
        };

        const response = await axios.post(SHOPIFY_API_URL, productData, {
            headers: {
                'Content-Type': 'application/json',
                'X-Shopify-Access-Token': shopToken,
            },
        });

        res.status(201).json({
            message: 'Product added successfully',
            product: response.data.product,
        });
    } catch (error) {

        if (error.response) {
            res.status(error.response.status).json({
                error: error.response.data.errors,
            });
        } else {
            res.status(500).json({
                error: error.message,
            });
        }
    }
}