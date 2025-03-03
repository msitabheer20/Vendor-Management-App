import { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Page, Card, Text, Box, InlineStack, Button } from "@shopify/polaris";
import { DeleteIcon } from '@shopify/polaris-icons';
import { useContext } from "react";
import VendorContext from "../../context/VendorContext";

const ProductDetails = () => {

	const { vendor } = useContext(VendorContext);
	const vendorName = vendor?.name;

	const { id } = useParams(); // Get the ID from the route
	const navigate = useNavigate();
	const location = useLocation();
	const { url, token } = location.state || {};



	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		if (!url || !token) {
			setError("Missing shop credentials");
			setLoading(false);
			return;
		}

		const fetchProducts = async () => {
			try {
				const response = await axios.get(`http://localhost:5000/api/products`, {
					params: { vendorName, url, token },
				});

				setProducts(response.data.products);
			} catch (err) {
				setError("Failed to fetch products");
			}
			setLoading(false);
		};

		fetchProducts();
	}, [vendorName, url, token]);

	// console.log(products);

	const handleProductClick = (productId, name) => {
		navigate(`/product/${id}/${productId}`, { state: { url, token, name } });
	}

	const handleProductDelete = async(productId) => {
		try {
			const response = await axios.delete(`http://localhost:5000/api/products/${productId}`, {
				params: { url, token },
			});

			alert("Product deleted");
			setProducts(products.filter((product) => product.id !== productId))

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
					<Text as="h1" variant="headingLg">Shop ID: {id}</Text>
				</Box>

				{loading ? (
					<Text as="p" variant="bodyMd">Loading products...</Text>
				) : error ? (
					<Text as="p" variant="bodyMd" color="critical">{error}</Text>
				) : (
					<Box padding="200">
						<Text as="h2" variant="headingMd">Products:</Text>
						{products.length > 0 ? (
							<div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
								{products.map((product) => (
									<div key={product.id} style={{ width: "250px", textAlign: "center", border: "1px solid #ddd", borderRadius: "8px", padding: "10px" }}>
										<Text as="p" variant="bodyMd">{product.title}</Text>
										{product.image && product.image.src && (
											<img src={product.image.src} alt={product.title} style={{ width: "150px", height: "150px", objectFit: "contain", marginTop: "10px" }} />
										)}
										<InlineStack align="space-between">
											<Button onClick={()=>handleProductDelete(product.id)} icon={DeleteIcon} variant="primary" tone="critical">Delete</Button>
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
	);
};

export default ProductDetails;
