import { Badge, BlockStack, Box, Button, Grid, Image, InlineCode, InlineGrid, InlineStack, Page, Spinner, Text } from "@shopify/polaris";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom"
import axios from 'axios'
import { useParams } from "react-router-dom";

const SingleProduct = () => {

	const location = useLocation();
	const { url, token } = location.state || {};
	const { productId } = useParams();

	const fetchProduct = async () => {
		const { data } = await axios.get(`http://localhost:5000/api/products/${productId}`, {
			params: { url, token }
		});
		return data.product;
	}

	const fetchImages = async () => {
		const { data } = await axios.get(`http://localhost:5000/api/products/${productId}/images`, {
			params: { url, token }
		});
		return data.images;
	}

	const { data: product, isLoading: loadingProduct } = useQuery({
		queryKey: ["product"],
		queryFn: fetchProduct,
	});
	const { data: images, isLoading: loadingImages } = useQuery({
		queryKey: ["images"],
		queryFn: fetchImages,
	});

	if (loadingProduct) {
		return (
			<Box padding="400" display="flex" align="center" justify="center">
				<Spinner accessibilityLabel="Loading vendor profile" size="large" />
			</Box>
		);
	}
	if (loadingImages) {
		return (
			<Box padding="400" display="flex" align="center" justify="center">
				<Spinner accessibilityLabel="Loading vendor profile" size="large" />
			</Box>
		);
	}

	return (
		<Page
			title="Product View"
			titleMetadata={<Badge tone="success">Paid</Badge>}
			compactTitle
			fullWidth
			primaryAction={<Button variant="primary" onClick={() => alert("Hello")} disabled>Update</Button>}
		>
			<InlineGrid gap="1200" columns={2}>
				<Box>
					{images.length > 0 ? <img
						src={images[0].src}
						style={{ objectFit: "cover", width: "100%", height: "100%" }}
						alt='Media image'
					/> : <Text>No images</Text>}
				</Box>

				<BlockStack gap="400">

					<Box>
						<InlineStack gap="600">
							<Text as="p">Product id : {product.variants[0].product_id}</Text>
							<Text as="p">Product type : {product.product_type}</Text>
						</InlineStack>
						<InlineStack gap="200">
							<Text variant="heading2xl" as="h1">{product?.title?.toUpperCase()}</Text>
							<Text><Badge size="small" tone="success">{product.status}</Badge></Text>
						</InlineStack>
					</Box>
					<BlockStack>
						<InlineStack gap="100">
							<Text fontWeight="bold">Created At:</Text>
							<Text>{product?.created_at}</Text>
						</InlineStack>

						<InlineStack>
							<Text fontWeight="bold"> Last Updated At : </Text>
							<Text>{product?.updated_at}</Text>
						</InlineStack>
					</BlockStack>

					<Box>
						<BlockStack gap="400">
							<div dangerouslySetInnerHTML={{ __html: product?.body_html }} />

							<InlineStack gap="200">
								<Text>Tags : </Text>
								{
									product.tags.split(", ").map((item) => (
										<Badge key={item}>{item}</Badge>
									))
								}
							</InlineStack>
						</BlockStack>
					</Box>

					<InlineStack>
						<Text as="h1" variant="headingLg" fontWeight="bold">Rs. {product.variants[0].price}</Text>
					</InlineStack>

				</BlockStack>

			</InlineGrid>
		</Page>
	)
}

export default SingleProduct
