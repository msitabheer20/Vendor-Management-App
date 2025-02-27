import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import { Badge, Page, Card, Text, Box, Image } from "@shopify/polaris";
import { useContext } from "react";
import VendorContext from "../../context/VendorContext";

const ProductDetails = () => {

	const { vendor } = useContext(VendorContext);
	const vendorName = vendor?.name;

	const { id } = useParams(); // Get the ID from the route
	const location = useLocation();
	const { url, token } = location.state || {}; // Get URL & token from state

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
				console.log("from productDetails.jsx : ", response.data);
				setProducts(response.data.products);
			} catch (err) {
				setError("Failed to fetch products");
			}
			setLoading(false);
		};

		fetchProducts();
	}, [vendorName, url, token]);

	return (
		<Page
			title="Product Details"
			compactTitle
			primaryAction={{ content: 'Add Product',  onAction: () => alert("Hello")}}
		>
			{/* page added */}
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
									</div>
								))}
							</div>
						) : (
							<Text as="p" variant="bodyMd">No products available</Text>
						)}
					</Box>
				)}
			</Card>

			{/* page ends */}
		</Page>
	);
};

export default ProductDetails;
