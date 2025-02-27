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

import { Page, BlockStack, TextField, Button, Card, Layout, Text, Box, Divider, InlineStack, Checkbox } from "@shopify/polaris";
import { useState } from "react";
import "./addProduct.css";
import { RichTextEditor } from "../../components/richTextEditor/RichTextEditor";
import 'react-quill/dist/quill.snow.css';
import { MediaGrid } from "../../components/mediaGrid/MediaGrid";

const AddProduct = () => {
	// const [product, setProduct] = useState({
	// 	title: "",
	// 	description: "",
	// 	price: "",
	// 	compareAtPrice: "",
	// 	sku: "",
	// 	inventory: "",
	// 	productType: "",
	// 	vendor: "",
	// 	tags: "",
	// 	shopLink: "",
	// 	status: "active",
	// 	image: null
	// });

	// const handleChange = (field, value) => {
	// 	setProduct({ ...product, [field]: value });
	// };

	// const handleFileChange = (e) => {
	// 	setProduct({ ...product, image: e.target.files[0] });
	// };

	// const handleSubmit = (e) => {
	// 	e.preventDefault();
	// 	console.log("Product Submitted:", product);
	// };

	return (
		// <Page
		// 	title="Add Products"
		// 	titleMetadata={<Badge tone="success">Paid</Badge>}
		// 	subtitle="Perfect for any product"
		// 	compactTitle

		// 	secondaryActions={[
		// 		{
		// 			content: 'View on your store',
		// 			onAction: () => alert('View on your store action'),
		// 		},
		// 	]}
		// 	actionGroups={[
		// 		{
		// 			title: 'Promote',
		// 			actions: [
		// 				{
		// 					content: 'Share on Facebook',
		// 					accessibilityLabel: 'Individual action label',
		// 					onAction: () => alert('Share on Facebook action'),
		// 				},
		// 			],
		// 		},
		// 	]}
		// >
		// 	<div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
		// 		{/* <BlockStack style={{ maxWidth: "500px" }} align="center"> */}
		// 			{/* <Card sectioned style={{ maxWidth: "500px", margin: "20px auto" }}> */}
		// 				<form onSubmit={handleSubmit} className="scrollable-form">
		// 					<TextField label="Title" value={product.title} onChange={(value) => handleChange("title", value)} autoComplete="off" required />

		// 					<TextField label="Description" value={product.description} onChange={(value) => handleChange("description", value)} multiline required />

		// 					<InlineStack gap="100">
		// 						<TextField label="Price ($)" type="number" value={product.price} onChange={(value) => handleChange("price", value)} required />
		// 						<TextField label="Compare at Price ($)" type="number" value={product.compareAtPrice} onChange={(value) => handleChange("compareAtPrice", value)} />
		// 						<TextField label="Inventory Quantity" type="number" value={product.inventory} onChange={(value) => handleChange("inventory", value)} required />
		// 					</InlineStack>

		// 					<InlineStack gap="100">
		// 						<TextField label="SKU" value={product.sku} onChange={(value) => handleChange("sku", value)} />
		// 						<TextField label="Product Type" value={product.productType} onChange={(value) => handleChange("productType", value)} required />
		// 						<TextField label="Vendor" value={product.vendor} onChange={(value) => handleChange("vendor", value)} required />
		// 					</InlineStack>

		// 					<InlineStack gap="100">
		// 						<TextField label="Tags (comma-separated)" value={product.tags} onChange={(value) => handleChange("tags", value)} />
		// 						<TextField label="Shop Link" value={product.shopLink} onChange={(value) => handleChange("shopLink", value)} />
		// 					</InlineStack>

		// 					<BlockStack gap="100">
		// 						<label>Product Image</label>
		// 						<input type="file" name="image" accept="image/*" onChange={handleFileChange} />
		// 					</BlockStack>

		// 					<BlockStack gap="100">
		// 						<label>Status</label>
		// 						<select name="status" value={product.status} onChange={(e) => handleChange("status", e.target.value)}>
		// 							<option value="active">Active</option>
		// 							<option value="draft">Draft</option>
		// 							<option value="archived">Archived</option>
		// 						</select>
		// 					</BlockStack>

		// 					<Button primary submit>
		// 						Add Product
		// 					</Button>
		// 				</form>
		// 			{/* </Card> */}
		// 		{/* </BlockStack> */}
		// 	</div>
		// </Page>

		<Page
			title="Add Products"
			primaryAction={<Button variant="primary" onClick={() => alert('Open Popover')}>Save</Button>}
			fullWidth
		>

			<Layout>
				<Layout.Section>
					<BlockStack gap="400">
						<Card>
							<BlockStack gap="400">
								<TextField placeholder="Short sleeve t-shirt" label="Title" />

								<RichTextEditor

									label="Description"
									modules={{
										toolbar: [
											[{ header: [1, 2, 3, 4, false] }],
											['bold', 'italic', 'underline', 'blockquote'],
											[{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
											[{ color: [] }, { background: [] }],
											['link'],
											['clean']
										]
									}}
								/>

								<MediaGrid />

								<BlockStack gap="200">
									<TextField label="Category" />
									<Text variant="bodySm" fontWeight="">Determines tax rates and adds metafields to improve search, filters, and cross-channel sales</Text>
								</BlockStack>
							</BlockStack>
						</Card>

						<Box borderRadius="300" background="bg-surface">
							<Box padding="400">
								<BlockStack gap="400">
									{/* <Box background="bg-surface"> */}
									<BlockStack gap="200">
										<Text variant="bodyLg" fontWeight="bold">Pricing</Text>
										<InlineStack gap="400">
											<TextField placeholder="Rs. 0.00" label="Price" />
											<TextField placeholder="Rs. 0.00" label="Compare-at price" />
										</InlineStack>
										<Checkbox
											label="Charge tax on this product"
										/>

									</BlockStack>
									{/* </Box> */}

								</BlockStack>
							</Box>

							<Divider />

							{/* box 2 */}
							<Box padding="400">
								<InlineStack align="space-between">
									<TextField placeholder="Rs. 0.00" label="Cost per item" />
									<TextField placeholder="Rs. 0.00" label="Profit" />
									<TextField placeholder="Rs. 0.00" label="Margin" />
								</InlineStack>
							</Box>
						</Box>
					</BlockStack>

				</Layout.Section>

				<Layout.Section variant="oneThird">
					<Card>

					</Card>
				</Layout.Section>
			</Layout>

		</Page>
	);
};

export default AddProduct;
