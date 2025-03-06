import { Box, Button, Card, InlineStack, Page, Spinner, Text } from "@shopify/polaris";
import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { DeleteIcon } from '@shopify/polaris-icons';

const AllProducts = () => {

	const [allProducts, setAllProducts] = useState([]);
	const [userData, setUserData] = useState(null);
	const [storeData, setStoreData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const navigate = useNavigate();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const localToken = localStorage.getItem("token");
				const adminResponse = await axios.get("https://vendor-management-app.onrender.com/api/vendor", {
					headers: { "Authorization": `Bearer ${localToken}` }
				});
				const adminData = adminResponse.data;
				setUserData(adminData);

				const productResponse = await axios.get("https://vendor-management-app.onrender.com/api/products/all", {
					headers: { "Authorization": `Bearer ${localToken}` },
					params: { url: adminData.storeUrl, token: adminData.accessToken }
				});
				setAllProducts(productResponse.data.products);

				const res = await axios.get("https://vendor-management-app.onrender.com/api/shop", {
					params: {url: adminData.storeUrl, token: adminData.accessToken},
					headers: { "Authorization": `Bearer ${localToken}` }
				});

				setStoreData(res.data.shop);

			} catch (error) {
				setError("Error fetching Products");
			}
			setLoading(false);
		};

		fetchData();
	}, []);

	const url = userData?.storeUrl;
	const token = userData?.accessToken;

	const handleProductClick = (productId, name) => {
		navigate(`/product/${storeData.id}/${productId}`, { state: { url, token, name } });
	}

	const handleProductDelete = async (productId) => {
		if (!url || !token) {
			alert("Missing store credentials. Please refresh and try again.");
			return;
		}
		try {
			await axios.delete(`https://vendor-management-app.onrender.com/api/products/${productId}`, {
				params: { url, token },
			});

			alert("Product deleted");
			setAllProducts((prevProducts) => prevProducts.filter((product) => product.id !== productId))

		} catch (err) {
			alert("Failed to delete product");
		}
	}


	return (
		<Page
			title="Product Details"
			compactTitle
			fullWidth
			primaryAction={{ content: 'Add Product', onAction: () => navigate("/addNew", { state: { url, token } }) }}
		>

			<Card>
				<Box padding="200">
					<Text as="h1" variant="headingLg">Shop ID: {storeData?.id}</Text>
				</Box>

				{loading ? (
					<Box padding="400" display="flex" align="center" justify="center">
						<Spinner accessibilityLabel="Loading vendor profile" size="large" />
					</Box>
				) : error ? (
					<Text as="p" variant="bodyMd" color="critical">{error}</Text>
				) : (
					<Box padding="200">
						<Text as="h2" variant="headingMd">Products:</Text>
						{allProducts.length > 0 ? (
							<div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
								{allProducts.map((product) => (
									<div key={product.id} style={{ width: "250px", textAlign: "center", border: "1px solid #ddd", borderRadius: "8px", padding: "10px" }}>
										<Text as="p" variant="bodyMd">{product.title}</Text>
										{product.image && product.image.src && (
											<img src={product.image.src} alt={product.title} style={{ width: "150px", height: "150px", objectFit: "contain", marginTop: "10px" }} />
										)}
										<InlineStack align="space-between">
											<Button onClick={() => handleProductDelete(product.id)} icon={DeleteIcon} variant="primary" tone="critical">Delete</Button>
											<Button onClick={() => handleProductClick(product.id, product.title)}>View More</Button>
										</InlineStack>
									</div>
								))}
							</div>
						) : (
							<Text as="p" variant="bodyMd">No products available</Text>
						)}
					</Box>
				)}
			</Card>

		</Page>
	)
}

export default AllProducts
