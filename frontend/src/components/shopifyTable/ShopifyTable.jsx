import { useEffect, useState } from "react";
import { Button, Card, DataTable, InlineStack, Layout, Page, Text, TextField } from "@shopify/polaris";
import { PlusIcon } from "@shopify/polaris-icons"
import axios from "axios";
import VendorContext from "../../context/VendorContext";
import { useContext } from "react";

const API_URL_STORE = "https://vendor-management-app.onrender.com/api/stores";
const API_URL_VENDOR = "https://vendor-management-app.onrender.com/api/vendor/pending"

const ShopifyTable = () => {
    const { isAdmin } = useContext(VendorContext);
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [storeName, setStoreName] = useState("");
    const [accessToken, setAccessToken] = useState("");
    const [stores, setStores] = useState([]);
    const [shopLink, setShopLink] = useState("");
    const [editId, setEditId] = useState(null);
    const [copiedIndex, setCopiedIndex] = useState(null);
    const [pendingUsers, setPendingUsers] = useState([]);
    const [updateTrigger, setUpdateTrigger] = useState(false);
    
    useEffect(() => {
        if (isAdmin) {
            const fetchPending = async () => {
                const res = await axios.get(API_URL_VENDOR, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                setPendingUsers(res.data);
            };
            fetchPending();
        } else {
            const fetchStores = (async () => {
                const res = await axios.get(API_URL_STORE, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                console.log("data from fetchStores function", res.data);
                setStores(res.data);
            });
            fetchStores();
        }
    }, [isAdmin, token, updateTrigger]);

    const handleAddStore = async () => {
        if (!storeName || !accessToken) return;

        const storeData = { storeName, shopLink, accessToken, id: editId };
        const res = await axios.post(API_URL_STORE, storeData, {
            headers: { Authorization: `Bearer ${token}` }
        });

        setUpdateTrigger(prev => !prev);

        setStoreName("");
        setAccessToken("");
        setShopLink("");
        setEditId(null);
    };

    const handleApprove = async (id) => {
        await axios.put(`https://vendor-management-app.onrender.com/api/vendor/pending/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        setPendingUsers(pendingUsers.filter(user => user._id !== id));
    }

    const handleReject = async (id) => {
        await axios.delete(`https://vendor-management-app.onrender.com/api/vendor/pending/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        setPendingUsers(pendingUsers.filter(user => user._id !== id));
    }

    const handleEdit = (store) => {
        setStoreName(store.storeName);
        setAccessToken(store.accessToken);
        setShopLink(store.shopLink);
        setEditId(store._id);
    };

    const handleDelete = async (id) => {
        await axios.delete(`${API_URL_STORE}/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        });

        setStores((prev) => prev.filter((store) => store._id !== id));
    };

    const handleCopy = (token, index) => {
        navigator.clipboard.writeText(token);
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 1500);
    };

    const userRows = pendingUsers.map((user, index) => [
        user.name,
        user.email,
        new Date(user.createdAt).toLocaleString(),
        <InlineStack key={user.index} gap="200">
            <Button size="slim" onClick={() => handleApprove(user._id)}>Approve</Button>
            <Button variant="primary" tone="critical" size="slim" onClick={() => handleReject(user._id)}>Reject</Button>
        </InlineStack>
    ])

    const userHeading = ["Vendor Name", "Vendor Email", "Request At", "Actions"]
    const storeHeading = ["Store Name", "Shop Link", "Access Token", "Actions"]

    const storeRows = stores?.map((store, index) => [
        store.storeName,
        store.shopLink,
        <Text key={index} className="masked">{"•".repeat(12)}</Text>,
        <InlineStack key={index} gap="200">
            <Button size="slim" onClick={() => handleCopy(store.accessToken, index)}>
                {copiedIndex === index ? "Copied!" : "Copy"}
            </Button>
            <Button variant="primary" tone="success" size="slim" onClick={() => handleEdit(store)}>Edit</Button>
            <Button variant="primary" tone="critical" size="slim" destructive onClick={() => handleDelete(store._id)}>Delete</Button>
        </InlineStack>
    ]);

    return (
        <Layout>
            <Layout.Section>
                {!isAdmin && (<Card sectioned>
                    <InlineStack align="space-around">
                        <TextField placeholder="Shopify Store Name" value={storeName} onChange={setStoreName} autoComplete="off" />
                        <TextField placeholder="Shopify Shop Link" value={shopLink} onChange={setShopLink} autoComplete="off" />
                        <TextField placeholder="Shopify Access Token" value={accessToken} onChange={setAccessToken} type="password" autoComplete="off" />
                        <Button icon={PlusIcon} variant="primary" onClick={handleAddStore}>{editId ? "Update Store" : "Add Store"}</Button>
                    </InlineStack>
                </Card>)}

                <Card>
                    <DataTable
                        verticalAlign="middle"
                        columnContentTypes={["text", "text", "text", "text"]}
                        headings={isAdmin ? userHeading : storeHeading}
                        rows={isAdmin ? userRows : storeRows}
                    />
                </Card>
            </Layout.Section>
        </Layout>
    );
};

export default ShopifyTable;
