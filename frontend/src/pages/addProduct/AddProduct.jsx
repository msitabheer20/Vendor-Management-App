// import { useState } from "react";
// import './addProduct.css'

// const AddProduct = () => {
//     const [product, setProduct] = useState({
//         title: "",
//         description: "",
//         price: "",
//         compareAtPrice: "",
//         sku: "",
//         inventory: "",
//         productType: "",
//         vendor: "",
//         tags: "",
//         shopLink: "",
//         status: "active",
//         image: null
//     });

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setProduct({ ...product, [name]: value });
//     };

//     const handleFileChange = (e) => {
//         setProduct({ ...product, image: e.target.files[0] });
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         console.log("Product Submitted:", product);
//     };

//     return (
//         <div className="form-container">
//             <form onSubmit={handleSubmit} className="scrollable-form">
//                 <label>Title</label>
//                 <input type="text" name="title" value={product.title} onChange={handleChange} required />

//                 <label>Description</label>
//                 <textarea name="description" value={product.description} onChange={handleChange} required />

//                 <div className="price">
//                     {/* <label>Price ($)</label> */}
//                     <input type="number" name="price" placeholder="Price" value={product.price} onChange={handleChange} required />

//                     {/* <label>Compare at Price ($)</label> */}
//                     <input type="number" name="compareAtPrice" placeholder="Compare at Price" value={product.compareAtPrice} onChange={handleChange} />

//                     {/* <label>Inventory Quantity</label> */}
//                     <input type="number" placeholder="Inventory Quantity" name="inventory" value={product.inventory} onChange={handleChange} required />
//                 </div>

//                 <div className="sku">
//                     {/* <label>SKU</label> */}
//                     <input type="text" name="sku" placeholder="SKU" value={product.sku} onChange={handleChange} />

//                     {/* <label>Product Type</label> */}
//                     <input type="text" placeholder="Product Type" name="productType" value={product.productType} onChange={handleChange} required />

//                     {/* <label>Vendor</label> */}
//                     <input type="text" placeholder='Vendor' name="vendor" value={product.vendor} onChange={handleChange} required />
//                 </div>


//                 <div className="tag" style={{ display: "flex", gap: "10px", justifyContent: "space-between" }}>
//                     <input style={{ flex: 1 }} placeholder="Tags (comma-separated)" type="text" name="tags" value={product.tags} onChange={handleChange} />
//                     <input style={{ flex: 1 }} placeholder="Shop Link" type="text" name="tags" value={product.shopLink} onChange={handleChange} />
//                 </div>

//                 <div className="imageNstatus">
//                     <label>Product Image</label>
//                     <input type="file" name="image" accept="image/*" onChange={handleFileChange} />

//                     <label>Status</label>
//                     <select name="status" value={product.status} onChange={handleChange}>
//                         <option value="active">Active</option>
//                         <option value="draft">Draft</option>
//                         <option value="archived">Archived</option>
//                     </select>
//                 </div>

//                 <button className="form-btn" type="submit">Add Product</button>
//             </form>
//         </div>
//     );
// }

// export default AddProduct

import { BlockStack, InlineStack, TextField, Button, Card } from "@shopify/polaris";
import { useState } from "react";
import "./addProduct.css";

const AddProduct = () => {
    const [product, setProduct] = useState({
        title: "",
        description: "",
        price: "",
        compareAtPrice: "",
        sku: "",
        inventory: "",
        productType: "",
        vendor: "",
        tags: "",
        shopLink: "",
        status: "active",
        image: null
    });

    const handleChange = (field, value) => {
        setProduct({ ...product, [field]: value });
    };

    const handleFileChange = (e) => {
        setProduct({ ...product, image: e.target.files[0] });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Product Submitted:", product);
    };

    return (
        <div style={{display: "flex", justifyContent:"center", alignItems: "center"}}>
            <BlockStack style={{ maxWidth: "500px" }} align="center">
                <Card sectioned style={{ maxWidth: "500px", margin: "20px auto" }}>
                    <form onSubmit={handleSubmit} className="scrollable-form">
                        <TextField label="Title" value={product.title} onChange={(value) => handleChange("title", value)} autoComplete="off" required />

                        <TextField label="Description" value={product.description} onChange={(value) => handleChange("description", value)} multiline required />

                        <InlineStack gap="100">
                            <TextField label="Price ($)" type="number" value={product.price} onChange={(value) => handleChange("price", value)} required />
                            <TextField label="Compare at Price ($)" type="number" value={product.compareAtPrice} onChange={(value) => handleChange("compareAtPrice", value)} />
                            <TextField label="Inventory Quantity" type="number" value={product.inventory} onChange={(value) => handleChange("inventory", value)} required />
                        </InlineStack>

                        <InlineStack gap="100">
                            <TextField label="SKU" value={product.sku} onChange={(value) => handleChange("sku", value)} />
                            <TextField label="Product Type" value={product.productType} onChange={(value) => handleChange("productType", value)} required />
                            <TextField label="Vendor" value={product.vendor} onChange={(value) => handleChange("vendor", value)} required />
                        </InlineStack>

                        <InlineStack gap="100">
                            <TextField label="Tags (comma-separated)" value={product.tags} onChange={(value) => handleChange("tags", value)} />
                            <TextField label="Shop Link" value={product.shopLink} onChange={(value) => handleChange("shopLink", value)} />
                        </InlineStack>

                        <BlockStack gap="100">
                            <label>Product Image</label>
                            <input type="file" name="image" accept="image/*" onChange={handleFileChange} />
                        </BlockStack>

                        <BlockStack gap="100">
                            <label>Status</label>
                            <select name="status" value={product.status} onChange={(e) => handleChange("status", e.target.value)}>
                                <option value="active">Active</option>
                                <option value="draft">Draft</option>
                                <option value="archived">Archived</option>
                            </select>
                        </BlockStack>

                        <Button primary submit>
                            Add Product
                        </Button>
                    </form>
                </Card>
            </BlockStack>
        </div>
    );
};

export default AddProduct;
