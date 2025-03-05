import mongoose from "mongoose";

const storeSchema = new mongoose.Schema({
    storeName: {
        type: String,
        required: true
    },
    shopLink: {
        type: String,
        required: false
    },
    accessToken: {
        type: String,
        required: true
    },
});

const Store = mongoose.model("Store", storeSchema);
export default Store;