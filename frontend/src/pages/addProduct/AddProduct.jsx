import { Page, BlockStack, TextField, Button, Card, Layout, Text, Box, Divider, InlineStack, Checkbox, Select, DropZone, LegacyStack, Thumbnail, List, Banner } from "@shopify/polaris";
import { useCallback, useState, useContext } from "react";
import VendorContext from "../../context/VendorContext";
import "./addProduct.css";
import { RichTextEditor } from "../../components/richTextEditor/RichTextEditor";
import 'react-quill/dist/quill.snow.css';
import axios from "axios";
import { useLocation } from "react-router-dom";


const AddProduct = () => {

	const { vendor } = useContext(VendorContext);
	const vendorName = vendor ? vendor.name : "";
	const location = useLocation();
	const { url, token } = location.state || {};

	const [product, setProduct] = useState({
		title: "",
		description: "",
		price: "",
		compareAtPrice: "",
		sku: "",
		barcode: "",
		inventory: "",
		vendor: vendorName,
		weight: "",
		profit: "",
		margin: "",
		category: "",
		costPerItem: "",
		weightUnit: "",
		productType: "",
		tags: "",
		status: "Active",
		images: [],
		shopName: url,
		shopToken: token,
		quantity: "",
	});

	const handleChange = useCallback((field, value) => {
		setProduct({ ...product, [field]: value });
	}, [product]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const res = await axios.post("https://vendor-management-app.onrender.com/api/products/new", JSON.stringify(product),
				{
					headers: { "Content-Type": "application/json" },
				}
			);
			alert("Product added successfully!");

		} catch (error) {
			alert(error.response?.data?.error || "Something went wrong. Please try again.");
			console.error("Error adding products:", error);
		}
	};

	////////////// Image Adding Logic //////////////////////////////////////////////////// 

	const [files, setFiles] = useState([]);
	const [rejectedFiles, setRejectedFiles] = useState([]);
	const hasError = rejectedFiles.length > 0;

	const handleDrop = useCallback(async (_droppedFiles, acceptedFiles, rejectedFiles) => {
		setFiles((files) => [...files, ...acceptedFiles]);
		setRejectedFiles(rejectedFiles);

		const base64Images = await Promise.all(acceptedFiles.map(async (file) => {
			const base64Image = await fileToBase64(file);
			return { attachment: base64Image };
		}));

		handleChange("images", base64Images);
	}, [handleChange]);


	const fileToBase64 = (file) => {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => resolve(reader.result.split(',')[1]); // Extract Base64 without metadata
			reader.onerror = (error) => reject(error);
		});
	};

	const fileUpload = !files.length && <DropZone.FileUpload />;
	const uploadedFiles = files.length > 0 && (
		<LegacyStack vertical>
			{files.map((file, index) => (
				<LegacyStack alignment="center" key={index}>
					<Thumbnail
						size="small"
						alt={file.name}
						source={window.URL.createObjectURL(file)}
					/>
					<div>
						{file.name}{' '}
						<Text variant="bodySm" as="p">
							{file.size} bytes
						</Text>
					</div>
				</LegacyStack>
			))}
		</LegacyStack>
	);

	const errorMessage = hasError && (
		<Banner title="The following images couldn&apos;t be uploaded:" tone="critical">
			<List type="bullet">
				{rejectedFiles.map((file, index) => (
					<List.Item key={index}>
						{`"${file.name}" is not supported. File type must be .gif, .jpg, .png or .svg.`}
					</List.Item>
				))}
			</List>
		</Banner>
	);

	// ///////Image adding logic ends /////////////////////////

	return (


		<Page
			title="Add Products"
			primaryAction={<Button variant="primary" onClick={(e) => handleSubmit(e)}>Save</Button>}
			fullWidth
		>

			<Layout>
				<Layout.Section>
					<BlockStack gap="400">
						<Card>
							<BlockStack gap="400">
								<TextField placeholder="Short sleeve t-shirt" label="Title"
									value={product.title} onChange={(value) => handleChange("title", value)}
								/>

								<RichTextEditor

									label="Description"
									value={product.description}
									onChange={(value) => handleChange("description", value)}
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

								{errorMessage}
								<DropZone accept="image/*" type="image" onDrop={handleDrop}>
									{uploadedFiles}
									{fileUpload}
								</DropZone>

								<BlockStack gap="200">
									<TextField value={product.category} onChange={(value) => handleChange("category", value)} label="Category" />
									<Text variant="bodySm" fontWeight="">Determines tax rates and adds metafields to improve search, filters, and cross-channel sales</Text>
								</BlockStack>
							</BlockStack>
						</Card>

						<Box shadow="200" borderRadius="300" background="bg-surface">
							<Box padding="400">
								<BlockStack gap="400">
									{/* <Box background="bg-surface"> */}
									<BlockStack gap="200">
										<Text variant="bodyLg" fontWeight="bold">Pricing</Text>
										<InlineStack gap="400">
											<TextField type="number" value={product.price} onChange={(value) => handleChange("price", value)} placeholder="Rs. 0.00" label="Price" />
											<TextField type="number" value={product.compareAtPrice} onChange={(value) => handleChange("compareAtPrice", value)} placeholder="Rs. 0.00" label="Compare-at price" />
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
									<TextField type="number" value={product.costPerItem} onChange={(value) => handleChange("costPerItem", value)} placeholder="Rs. 0.00" label="Cost per item" />
									<TextField type="number" value={product.profit} onChange={(value) => handleChange("profit", value)} placeholder="Rs. 0.00" label="Profit" />
									<TextField type="number" value={product.margin} onChange={(value) => handleChange("margin", value)} placeholder="Rs. 0.00" label="Margin" />
								</InlineStack>
							</Box>
						</Box>

						<Card>
							<BlockStack gap="400">
								<Text variant="bodyLg" fontWeight="bold">Inventory</Text>
								<InlineStack align="start">
									<TextField value={product.quantity} onChange={(value) => handleChange("quantity", value)} type="number" label="Quantity" />
								</InlineStack>

								<InlineStack gap="400">
									<TextField value={product.sku} onChange={(value) => handleChange("sku", value)} label="SKU (Stock Keeping Unit)" />
									<TextField value={product.barcode} onChange={(value) => handleChange("barcode", value)} label="Barcode" />
								</InlineStack>
							</BlockStack>
						</Card>


						<Card>
							<BlockStack gap="400">
								<Text variant="bodyLg" fontWeight="bold">Shipping</Text>
								<Checkbox label="This is a physical product" />
								<InlineStack align="start">
									<TextField type="number" value={product.weight} onChange={(value) => handleChange("weight", value)} labelHidden placeholder="0.0g" label="Weight" connectedRight={
										<Select
											label="Unit of weight"
											labelHidden
											options={['kg', 'g', 'lb']}
											onChange={(value) => handleChange("weightUnit", value)}
											value={product.weightUnit}
										/>
									} />
								</InlineStack>
							</BlockStack>
						</Card>
					</BlockStack>

				</Layout.Section>

				<Layout.Section variant="oneThird">
					<BlockStack gap="400">
						<Card>
							<BlockStack gap="200">
								<Text variant="bodyLg" fontWeight="bold">Status</Text>
								<Select
									labelHidden
									value={product.status}
									options={['Active', 'Draft']}
									onChange={(value) => handleChange("status", value)}
								/>
							</BlockStack>
						</Card>

						<Card>
							<BlockStack gap="400">
								<Text variant="bodyLg" fontWeight="bold">Product Organization</Text>
								<TextField value={product.productType} onChange={(value) => handleChange("productType", value)} label="Type" />
								<TextField value={product.tags} onChange={(value) => handleChange("tags", value)} label="Tags" />
							</BlockStack>
						</Card>

						<Card>
							<BlockStack gap="400">
								<Text variant="bodyLg" fontWeight="bold">Shop Details</Text>
								<TextField value={product.shopName} onChange={(value) => handleChange("shopName", value)} label="Shop URL" />
								<TextField value={product.shopToken} onChange={(value) => handleChange("shopToken", value)} label="Shop Access Token" />
							</BlockStack>
						</Card>
					</BlockStack>
				</Layout.Section>
			</Layout>

		</Page>
	);
};

export default AddProduct;