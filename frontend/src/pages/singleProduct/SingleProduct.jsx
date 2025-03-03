import { Badge, BlockStack, Box, Button, Grid, Image, InlineCode, InlineGrid, InlineStack, Page, Text } from "@shopify/polaris";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom"
import axios from 'axios'
import { useParams } from "react-router-dom";

const SingleProduct = () => {

    // const [loading, setLoading] = useState(true);
    // const [error, setError] = useState(null);
    // const [product, setProduct] = useState({});

    const location = useLocation();
    const { url, token, name } = location.state || {};
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

    console.log(product);
    console.log(images);

    // useEffect(() => {
    //     if (!url || !token) {
    //         setError("Missing shop credentials");
    //         setLoading(false);
    //         return;
    //     }

    //     const fetchProduct = async () => {
    //         try {
    //             const response = await axios.get(`http://localhost:5000/api/products/${productId}`, {
    //                 params: { url, token }
    //             });
    //             const response = await axios.get(`http://localhost:5000/api/products/${productId}/images`, {
    //                 params: { url, token }
    //             });
    //             console.log(response.data);
    //             setProduct(response.data.product);
    //         } catch (err) {
    //             setError("Failed to fetch product");
    //         }
    //         setLoading(false);
    //     }

    //     fetchProduct();
    // }, [productId, url, token]);


    // if (loading) {
    //     return <Text as="p" variant="bodyMd" color="critical">Loading...</Text>
    // }

    // if (error) {
    //     return <Text as="p" variant="bodyMd" color="critical">{error}</Text>
    // }

    if (loadingProduct) return <Text>Loading Product...</Text>;
    if (loadingImages) return <Text>Loading Images...</Text>;

    return (
        <Page
            title="Product View"
            titleMetadata={<Badge tone="success">Paid</Badge>}
            compactTitle
            fullWidth
            primaryAction={<Button variant="primary" onClick={() => alert("Hello")} disabled>Update</Button>}
        >

            {/* url : {url}
            token : {token}
            name : {name}
            id : {productId} */}
            {/* <InlineStack gap="2400"> */}
            <InlineGrid gap="1200" columns={2}>
                {/* <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}> */}
                    <Box>
                        {images.length > 0 ? <img
                            src={images[0].src}
                            // width='50%'
                            // height='50%'
                            style={{ objectFit: "cover", width: "100%", height: "100%"}}
                            alt='Media image'
                        /> : <Text>No images</Text>}
                    </Box>
                {/* </Grid.Cell> */}

                {/* <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}> */}
                    <BlockStack gap="400">
                        <Text variant="heading2xl" as="h1">{product?.title?.toUpperCase()}</Text>

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
                            <div dangerouslySetInnerHTML={{ __html: product?.body_html }} />
                        </Box>

                    </BlockStack>
                {/* </Grid.Cell> */}
                {/* </InlineStack> */}
            </InlineGrid>
        </Page>
    )
}

export default SingleProduct
