import { useState } from "react";
import './addProduct.css'

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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    const handleFileChange = (e) => {
        setProduct({ ...product, image: e.target.files[0] });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Product Submitted:", product);
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit} className="scrollable-form">
                <label>Title</label>
                <input type="text" name="title" value={product.title} onChange={handleChange} required />

                <label>Description</label>
                <textarea name="description" value={product.description} onChange={handleChange} required />

                <div className="price">
                    {/* <label>Price ($)</label> */}
                    <input type="number" name="price" placeholder="Price" value={product.price} onChange={handleChange} required />

                    {/* <label>Compare at Price ($)</label> */}
                    <input type="number" name="compareAtPrice" placeholder="Compare at Price" value={product.compareAtPrice} onChange={handleChange} />

                    {/* <label>Inventory Quantity</label> */}
                    <input type="number" placeholder="Inventory Quantity" name="inventory" value={product.inventory} onChange={handleChange} required />
                </div>

                <div className="sku">
                    {/* <label>SKU</label> */}
                    <input type="text" name="sku" placeholder="SKU" value={product.sku} onChange={handleChange} />

                    {/* <label>Product Type</label> */}
                    <input type="text" placeholder="Product Type" name="productType" value={product.productType} onChange={handleChange} required />

                    {/* <label>Vendor</label> */}
                    <input type="text" placeholder='Vendor' name="vendor" value={product.vendor} onChange={handleChange} required />
                </div>


                <div className="tag" style={{ display: "flex", gap: "10px", justifyContent: "space-between" }}>
                    <input style={{ flex: 1 }} placeholder="Tags (comma-separated)" type="text" name="tags" value={product.tags} onChange={handleChange} />
                    <input style={{ flex: 1 }} placeholder="Shop Link" type="text" name="tags" value={product.shopLink} onChange={handleChange} />
                </div>

                <div className="imageNstatus">
                    <label>Product Image</label>
                    <input type="file" name="image" accept="image/*" onChange={handleFileChange} />

                    <label>Status</label>
                    <select name="status" value={product.status} onChange={handleChange}>
                        <option value="active">Active</option>
                        <option value="draft">Draft</option>
                        <option value="archived">Archived</option>
                    </select>
                </div>

                <button className="form-btn" type="submit">Add Product</button>
            </form>
        </div>
    );
}

export default AddProduct
