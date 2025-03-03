import { useState, useEffect } from "react";
import PropTypes from 'prop-types'
import axios from "axios";
import VendorContext from './VendorContext'

export const VendorProvider = ({ children }) => {
  const [vendor, setVendor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVendor = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setLoading(false);
          return;
        }

        // console.log("Fetching vendor with token:", token);

        const res = await axios.get("http://localhost:5000/api/vendor/", {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        ("Fetched vendor data:", res.data);
        setVendor(res.data);
      } catch (error) {
        console.error("Error fetching vendor:", error.response?.data || error);
      } finally {
        setLoading(false);
      }
    };

    fetchVendor();
  }, []);


  const updateVendor = (vendorData) => {
    // console.log("Updating vendor:", vendorData);
    setVendor(vendorData);
  };

  return (
    <VendorContext.Provider value={{ vendor, updateVendor, loading }}>
      {children}
    </VendorContext.Provider>
  );
};

VendorProvider.propTypes = {
    children: PropTypes.node.isRequired,
}