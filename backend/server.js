import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import storeRoutes from "./routes/storeRoutes.js";
import vendorAuthRoute from "./routes/vendorAuthRoutes.js";
import vendorRoutes from "./routes/vendorRoutes.js";
import shopRoutes from "./routes/shopRoutes.js"
import productRoutes from "./routes/productRoutes.js"
import webhookRoutes from "./routes/webhookRoutes.js"
import bodyParser from "body-parser";

dotenv.config();

const app = express({ limit: "50mb" });
app.use(express.json());
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))


// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.error(err));

// Use Routes
app.use("/api/stores", storeRoutes);
app.use("/api/auth/vendor", vendorAuthRoute);
app.use("/api/vendor", vendorRoutes);
app.use("/api/shop", shopRoutes);
app.use("/api/products", productRoutes);
app.use("/webhooks", webhookRoutes);




const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
