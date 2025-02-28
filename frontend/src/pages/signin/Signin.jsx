// import { useState, useEffect, useContext } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import "./signin.css"
// import VendorContext from "../../context/VendorContext";

// const Signin = () => {
//     const { updateVendor } = useContext(VendorContext);
//     const [formData, setFormData] = useState({ email: "", password: "" });
//     const navigate = useNavigate();

//     useEffect(() => {
//         if (localStorage.getItem("token")) {
//             navigate("/");
//         }
//     });

//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const res = await axios.post("http://localhost:5000/api/auth/vendor/signin", formData);
//             localStorage.setItem("token", res.data.token);
//             updateVendor(res.data.vendor)
//             navigate("/");
//         } catch (error) {
//             alert(error.response.data.message);
//         }
//     };

//     return (
//         <div className="signin-container">
//             <form className="signin-form" onSubmit={handleSubmit}>
//                 <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
//                 <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
//                 <Link className="refer" to="/signup">Sign up here</Link>
//                 <button className="signin-button" type="submit">Login</button>
//             </form>
//         </div>
//     );
// };

// export default Signin;
import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AppProvider, Page, Card, Form, FormLayout, TextField, Button, Text } from "@shopify/polaris";
import VendorContext from "../../context/VendorContext";
import "@shopify/polaris/build/esm/styles.css";

const Signin = () => {
    const { updateVendor } = useContext(VendorContext);
    const [formData, setFormData] = useState({ email: "", password: "" });
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("token")) {
            navigate("/");
        }
    }, [navigate]);

    const handleChange = (field) => (value) => {
        setFormData({ ...formData, [field]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:5000/api/auth/vendor/signin", formData);
            localStorage.setItem("token", res.data.token);
            updateVendor(res.data.vendor);
            navigate("/");
        } catch (error) {
            alert(error.response.data.message);
        }
    };

    return (
        <AppProvider>
            <Page fullWidth>
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "80vh" }}>
                    <Card sectioned style={{ maxWidth: "400px", width: "100%" }}>
                        <Text variant="headingMd" alignment="center" as="h2">Vendor Login</Text>
                        <Form onSubmit={handleSubmit}>
                            <FormLayout>
                                <TextField label="Email" type="email" value={formData.email} onChange={handleChange("email")} autoComplete="email" required />
                                <TextField label="Password" type="password" value={formData.password} onChange={handleChange("password")} autoComplete="current-password" required />
                                <Text as="p">
                                    <Link to="/signup">Don&apos;t have an account? Sign up here</Link>
                                </Text>
                                <Button submit primary>Login</Button>
                            </FormLayout>
                        </Form>
                    </Card>
                </div>
            </Page>
        </AppProvider>
    );
};

export default Signin;
