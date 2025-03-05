// import { useState, useEffect, useContext } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import './signup.css'

// const Signup = () => {

//     const [formData, setFormData] = useState({
//         name: "",
//         email: "",
//         password: "",
//         businessName: "",
//         storeUrl: "",
//         phone: "",
//         address: ""
//     });

//     const navigate = useNavigate();

//     useEffect(() => {
//         if (localStorage.getItem("token")) {
//             navigate("/");
//         }
//     }, []);

//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             await axios.post("http://localhost:5000/api/auth/vendor/signup", formData);
//             navigate("/signin");
//         } catch (error) {
//             alert(error.response.data.message);
//         }
//     };

//     return (

//         <div className="signup-container">
//             <form className="signup-form" onSubmit={handleSubmit}>
//                 <div style={{ display: "flex", gap: "10px" }}>
//                     <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
//                     <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
//                 </div>
//                 <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
//                 <input type="text" name="businessName" placeholder="Business Name" onChange={handleChange} required />
//                 <input type="text" name="storeUrl" placeholder="Store URL" onChange={handleChange} required />
//                 <input type="text" name="phone" placeholder="Phone" onChange={handleChange} required />
//                 <input type="text" name="address" placeholder="Address" onChange={handleChange} required />
//                 <Link to="/signin" className="refer">Continue to login</Link>
//                 <button className="signup-button" type="submit">Signup</button>
//             </form>
//         </div>

//     );
// };

// export default Signup;
import { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AppProvider, Page, Card, Form, FormLayout, TextField, Button, Text, Layout, InlineStack } from "@shopify/polaris";
import "@shopify/polaris/build/esm/styles.css";
import "./signup.css";

const Signup = () => {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
		businessName: "",
		storeName: "",
		storeUrl: "",
		accessToken: "",
		phone: "",
		address: ""
	});

	const [isAdmin, setIsAdmin] = useState(false);
	const contentStatus = isAdmin ? 'For Admin' : 'For User';
	const toggleId = 'setting-toggle-uuid';

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
		const dataToSend = {
			...formData,
			isAdmin,
		}

		if (!isAdmin) {
			delete dataToSend.storeUrl;
			delete dataToSend.accessToken;
		}

		try {
			await axios.post("http://localhost:5000/api/auth/vendor/signup", dataToSend);
			navigate("/signin");
		} catch (error) {
			alert("Signup Error : ",error.response?.data?.message);
		}
	};

	const handleToggle = useCallback(() => {
		setIsAdmin((prev) => !prev);
		if (isAdmin) {
      setFormData((prev) => ({
        ...prev,
        shopUrl: "",
        accessToken: "",
      }));
    }
	}, [isAdmin]);

	return (
		<AppProvider>
			<Page narrowWidth>
				<div className="signup-container">
					<Card sectioned className="signup-form">
						<InlineStack>
							<Button
								role="switch"
								id={toggleId}
								ariaChecked={isAdmin ? 'true' : 'false'}
								onClick={handleToggle}
								size="slim"
							>
								{contentStatus}
							</Button>
						</InlineStack>
						<Text variant="headingMd" alignment="center" as="h2">{isAdmin ? "Admin" : "Vendor"} Signup</Text>
						<Form title="Vendor Signup" onSubmit={handleSubmit}>
							<FormLayout>
								<Layout>
									<Layout.Section oneHalf>

										<TextField label="Name" type="text" value={formData.name} onChange={handleChange("name")} required />
										<TextField label="Business Name" type="text" value={formData.businessName} onChange={handleChange("businessName")} required />
										<TextField label="Phone" type="text" value={formData.phone} onChange={handleChange("phone")} required />
									</Layout.Section>
									<Layout.Section oneHalf>
										<TextField label="Email" type="email" value={formData.email} onChange={handleChange("email")} autoComplete="email" required />
										{isAdmin && (
											<>
												<TextField label="Store URL" type="text" value={formData.storeUrl} onChange={handleChange("storeUrl")} required />
												<TextField label="Access Token" type="text" value={formData.accessToken} onChange={handleChange("accessToken")} required />
											</>
										)}
										<TextField label="Address" type="text" value={formData.address} onChange={handleChange("address")} required />
									</Layout.Section>
								</Layout>
								<TextField label="Password" type="password" value={formData.password} onChange={handleChange("password")} autoComplete="new-password" required />
								<Text as="p">
									<Link to="/signin">Already have an account? Sign in here</Link>
								</Text>
								<Button submit primary className="signup-button">Signup</Button>
							</FormLayout>
						</Form>
					</Card>
				</div>
			</Page>
		</AppProvider>
	);
};

export default Signup;



