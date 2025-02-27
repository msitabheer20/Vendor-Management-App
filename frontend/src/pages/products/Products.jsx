import axios from "axios";
import ShopCard from "../../components/shopCard/ShopCard"
import "./product.css"
import { useEffect, useState } from "react";
import { Page, Badge } from "@shopify/polaris"

const API_URL = "http://localhost:5000/api/stores";

const Products = () => {

    const [stores, setStores] = useState([]);

    useEffect(() => {
        fetchStores();
    }, []);

    const fetchStores = async () => {
        const res = await axios.get(API_URL);
        setStores(res.data);
    };

    return (
        <>
            <Page
                title="Stores"
                titleMetadata={<Badge tone="success">Paid</Badge>}
                subtitle="Search products in stores"
                compactTitle
                

                secondaryActions={[
                    {
                        content: 'View on your store',
                        onAction: () => alert('View on your store action'),
                    },
                ]}
            >
                <div className="product-container">
                    {
                        stores?.map((store) => (
                            <ShopCard key={store._id} id={store._id} url={store.shopLink} token={store.accessToken} />
                        ))
                    }
                </div>
            </Page>
        </>
    )
}

export default Products
