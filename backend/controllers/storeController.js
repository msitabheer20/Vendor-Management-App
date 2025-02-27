import Store from "../models/storeModel.js";
// const { createAdminRestApiClient } = require('@shopify/admin-api-client');

// Fetch all stores
export const getStores = async (req, res) => {
    try {
        const stores = await Store.find();
        res.json(stores);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

// Add or update a store
export const saveStore = async (req, res) => {
    const { storeName, shopLink, accessToken, id } = req.body;

    try {
        if (id) {
            // Update store
            await Store.findByIdAndUpdate(id, { storeName, shopLink, accessToken });
            res.json({ message: "Store updated successfully" });
        } else {
            // Create new store
            const newStore = new Store({ storeName, shopLink, accessToken });
            console.log(newStore);

            

            await newStore.save();
            res.json({ message: "Store added successfully" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error saving store" });
    }
};

// Delete a store
export const deleteStore = async (req, res) => {
    try {
        await Store.findByIdAndDelete(req.params.id);
        res.json({ message: "Store deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting store" });
    }
};
