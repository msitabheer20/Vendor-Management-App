import axios from "axios";
import ShopCard from "../../components/shopCard/ShopCard"
import "./product.css"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Page, Badge, InlineStack, Button } from "@shopify/polaris"
import {PlusIcon} from '@shopify/polaris-icons';

const API_URL = "http://localhost:5000/api/stores";

const Products = () => {

    const [stores, setStores] = useState([]);
    const navigate = useNavigate();
    
    useEffect(() => {
        const token = localStorage.getItem("token");
        const fetchStores = async () => {
            const res = await axios.get(API_URL, {
                headers: {"Authorization": `Bearer ${token}`}
            });
            setStores(res.data);
        };
        fetchStores();
    }, []);

    

    return (
        <>
            <Page
                title="Stores"
                titleMetadata={<Badge tone="success">Paid</Badge>}
                subtitle="Search products in stores"
                compactTitle
                fullWidth
                primaryAction={<Button icon={PlusIcon} onClick={()=>navigate("/")} variant="primary">Add Store</Button>}
            >
                <InlineStack align="start">
                    {
                        stores?.map((store) => (
                            <ShopCard key={store._id} id={store._id} url={store.shopLink} token={store.accessToken} />
                        ))
                    }
                </InlineStack>
            </Page>
        </>
    )
}

export default Products
