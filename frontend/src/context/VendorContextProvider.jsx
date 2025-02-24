import { useState, useEffect } from "react";
import PropTypes from 'prop-types'
import axios from "axios";
import VendorContext from "./VendorContext";

export const VendorProvider = ({ children }) => {
  const [vendor, setVendor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVendor = async () => {
      try {
        const token = localStorage.getItem("token");  // ✅ Token leke API call karo
        if (!token) return;

        const res = await axios.get("http://localhost:5000/api/vendors/", {
          headers: { Authorization: `Bearer ${token}` }
        });
        // console.log("VendorContext.jsx", res);
        setVendor(res.data);
      } catch (error) {
        console.error("Error fetching vendor:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVendor();
  }, []);


  const updateVendor = (vendorData) => {
    setVendor(vendorData);
  };

  return (
    <VendorContext.Provider value={{ vendor, updateVendor }}>
      {children}
    </VendorContext.Provider>
  );
};

VendorProvider.propTypes = {
    children: PropTypes.node.isRequired,
}