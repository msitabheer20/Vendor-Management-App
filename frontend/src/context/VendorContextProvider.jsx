import { useState, useEffect } from "react";
import PropTypes from 'prop-types'
import axios from "axios";
import VendorContext from './VendorContext'

export const VendorProvider = ({ children }) => {
  const [vendor, setVendor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(() => {
    return localStorage.getItem("isAdmin") === "true"
  })

  useEffect(() => {
    const fetchVendor = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setLoading(false);
          return;
        }

        const res = await axios.get("https://vendor-management-app.onrender.com/api/vendor/", {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        ("Fetched vendor data:", res.data);
        localStorage.setItem("isAdmin", isAdmin);
        setVendor(res.data);
      } catch (error) {
        console.error("Error fetching vendor:", error.response?.data || error);
      } finally {
        setLoading(false);
      }
    };

    fetchVendor();
  }, [isAdmin]);


  const updateVendor = (vendorData) => {
    setVendor(vendorData);
  };

  return (
    <VendorContext.Provider value={{ isAdmin, setIsAdmin, vendor, updateVendor, loading }}>
      {children}
    </VendorContext.Provider>
  );
};

VendorProvider.propTypes = {
    children: PropTypes.node.isRequired,
}