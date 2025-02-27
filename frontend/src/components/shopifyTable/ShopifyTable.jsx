// import { useEffect, useState } from "react";
// import './shopifyTable.css';
// import axios from "axios";

// const API_URL = "http://localhost:5000/api/stores";

// const ShopifyTable = () => {
//     const [storeName, setStoreName] = useState("");
//     const [accessToken, setAccessToken] = useState("");
//     const [stores, setStores] = useState([]);
//     const [shopLink, setShopLink] = useState("");
//     const [editId, setEditId] = useState(null);
//     const [copiedIndex, setCopiedIndex] = useState(null);

//     useEffect(() => {
//         fetchStores();
//     }, []);

//     const fetchStores = async () => {
//         const res = await axios.get(API_URL);
//         setStores(res.data);
//     };

//     const handleAddStore = async () => {
//         if (!storeName || !accessToken) return;

//         const storeData = { storeName, shopLink, accessToken, id: editId };

//         await axios.post(API_URL, storeData);

//         setStoreName("");
//         setAccessToken("");
//         setShopLink("");
//         setEditId(null);
//         fetchStores();
//     };

//     const handleEdit = (store) => {
//         setStoreName(store.storeName);
//         setAccessToken(store.accessToken);
//         setShopLink(store.shopLink);
//         setEditId(store._id);
//     };

//     const handleDelete = async (id) => {
//         await axios.delete(`${API_URL}/${id}`);
//         fetchStores();
//     };

//     const handleCopy = (token, index) => {
//         navigator.clipboard.writeText(token);
//         setCopiedIndex(index);
//         setTimeout(() => setCopiedIndex(null), 1500);
//     };

//     return (
//         <div className="table-container">
//             <h2>Manage Shopify Stores</h2>

//             <div className="table-form-container">
//                 <input
//                     type="text"
//                     placeholder="Shopify Store Name"
//                     value={storeName}
//                     onChange={(e) => setStoreName(e.target.value)}
//                 />
//                 <input
//                     type="text"
//                     placeholder="Shopify Shop Link"
//                     value={shopLink}
//                     onChange={(e) => setShopLink(e.target.value)}
//                 />
//                 <input
//                     type="password"
//                     placeholder="Shopify Access Token"
//                     value={accessToken}
//                     onChange={(e) => setAccessToken(e.target.value)}
//                 />
//                 <button className="addShopifyBtn" onClick={handleAddStore}>
//                     {editId ? "Update Store" : "Add Store"}
//                 </button>
//             </div>

//             <table>
//                 <thead>
//                     <tr>
//                         <th>Store Name</th>
//                         <th>Shop Link</th>
//                         <th>Access Token</th>
//                         <th>Actions</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {stores.map((store, index) => (
//                         <tr key={store._id}>
//                             <td>{store.storeName}</td>
//                             <td>
//                                 {store.shopLink}
//                             </td>
//                             <td>
//                                 <span className="masked" title={store.accessToken}>
//                                     {"•".repeat(12)}
//                                 </span>
//                             </td>
//                             <td className="shopifyDetails">
//                                 <button className="table-btn copy" onClick={() => handleCopy(store.accessToken, index)}>
//                                     {copiedIndex === index ? "Copied!" : "Copy"}
//                                 </button>
//                                 <button className="table-btn edit" onClick={() => handleEdit(store)}>Edit</button>
//                                 <button className="table-btn delete" onClick={() => handleDelete(store._id)}>Delete</button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// export default ShopifyTable;

import { useEffect, useState } from "react";
import { Button, Card, DataTable, Layout, Page, TextField } from "@shopify/polaris";
import axios from "axios";

const API_URL = "http://localhost:5000/api/stores";

const ShopifyTable = () => {
    const [storeName, setStoreName] = useState("");
    const [accessToken, setAccessToken] = useState("");
    const [stores, setStores] = useState([]);
    const [shopLink, setShopLink] = useState("");
    const [editId, setEditId] = useState(null);
    const [copiedIndex, setCopiedIndex] = useState(null);

    useEffect(() => {
        fetchStores();
    }, []);

    const fetchStores = async () => {
        const res = await axios.get(API_URL);
        setStores(res.data);
    };

    const handleAddStore = async () => {
        if (!storeName || !accessToken) return;

        const storeData = { storeName, shopLink, accessToken, id: editId };
        await axios.post(API_URL, storeData);

        setStoreName("");
        setAccessToken("");
        setShopLink("");
        setEditId(null);
        fetchStores();
    };

    const handleEdit = (store) => {
        setStoreName(store.storeName);
        setAccessToken(store.accessToken);
        setShopLink(store.shopLink);
        setEditId(store._id);
    };

    const handleDelete = async (id) => {
        await axios.delete(`${API_URL}/${id}`);
        fetchStores();
    };

    const handleCopy = (token, index) => {
        navigator.clipboard.writeText(token);
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 1500);
    };

    const rows = stores.map((store, index) => [
        store.storeName,
        store.shopLink,
        <span key={index} className="masked" title={store.accessToken}>{"•".repeat(12)}</span>,
        <div key={index} style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
            <Button size="slim" onClick={() => handleCopy(store.accessToken, index)}>
                {copiedIndex === index ? "Copied!" : "Copy"}
            </Button>
            <Button size="slim" onClick={() => handleEdit(store)}>Edit</Button>
            <Button size="slim" destructive onClick={() => handleDelete(store._id)}>Delete</Button>
        </div>
    ]);

    return (
            <Layout>
                <Layout.Section>
                    <Card sectioned>
                        <div style={{ display: "flex", gap: "10px", justifyContent: "center", flexWrap: "wrap" }}>
                            <TextField label="Shopify Store Name" value={storeName} onChange={setStoreName} autoComplete="off" />
                            <TextField label="Shopify Shop Link" value={shopLink} onChange={setShopLink} autoComplete="off" />
                            <TextField label="Shopify Access Token" value={accessToken} onChange={setAccessToken} type="password" autoComplete="off" />
                            <Button primary onClick={handleAddStore}>{editId ? "Update Store" : "Add Store"}</Button>
                        </div>
                    </Card>
                </Layout.Section>
                <Layout.Section>
                    <Card>
                        <DataTable
                            columnContentTypes={["text", "text", "text", "numeric"]}
                            headings={["Store Name", "Shop Link", "Access Token", "Actions"]}
                            rows={rows}
                        />
                    </Card>
                </Layout.Section>
            </Layout>
    );
};

export default ShopifyTable;
