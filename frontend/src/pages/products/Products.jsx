import axios from "axios";
import ShopCard from "../../components/shopCard/ShopCard"
import "./product.css"
import { useEffect, useState } from "react";

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
            <div className="product-container">
            {
                stores?.map((store, index) => (
                    <ShopCard key={index} />
                ))
            }
            </div>
        </>
    )
}

export default Products
