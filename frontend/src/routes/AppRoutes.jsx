import Layout from "../components/layout/Layout";
import Dashboard from "../pages/dashboard/Dashboard";
import AddProduct from "../pages/addProduct/AddProduct";
import Products from "../pages/products/Products";
import Inventory from "../pages/inventory/Inventory";
import Profile from "../pages/profile/Profile";
import Signup from "../pages/signup/Signup";
import Signin from "../pages/signin/Signin";
import PropTypes from "prop-types";
import { VendorProvider } from "../context/VendorContextProvider";
import ProductDetails from "../pages/productDetails/productDetails";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

const isAuthenticated = () => {
	return localStorage.getItem("token") !== null;
};

const ProtectedRoute = ({ element }) => {
	return isAuthenticated() ? element : <Navigate to="/signin" />;
};

const AppRoutes = () => {
	return (
		<VendorProvider>
			<Router>
				<Routes>
					{/* Public Routes */}
					<Route path="/signup" element={<Signup />} />
					<Route path="/signin" element={<Signin />} />

					{/* Protected Routes (Require Login) */}
					<Route path="/" element={<Layout />}>
						<Route index element={<ProtectedRoute element={<Dashboard />} />} />
						<Route path="/addNew" element={<ProtectedRoute element={<AddProduct />} />} />
						<Route path="/products" element={<ProtectedRoute element={<Products />} />} />
						<Route path="/product/:id" element={<ProtectedRoute element={<ProductDetails />} />} />
						<Route path="/inventory" element={<ProtectedRoute element={<Inventory />} />} />
						<Route path="/profile" element={<ProtectedRoute element={<Profile />} />}/>
					</Route>
				</Routes>
			</Router>
		</VendorProvider>
	);
};

ProtectedRoute.propTypes = {
	element: PropTypes.element.isRequired,
};

export default AppRoutes;