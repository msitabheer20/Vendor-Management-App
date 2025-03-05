import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";
import "./sidebar.css";
import { Badge, InlineStack, Text } from "@shopify/polaris";

const Sidebar = ({ fn, isOpen, setIsOpen }) => {
  const location = useLocation();
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  // const handleMouseEnter = () => setIsOpen(true);
  // const handleMouseLeave = () => setIsOpen(false);

  return (
    <div
      className={`sidebar ${isOpen ? "more-width" : "less-width"}`}
      // onMouseEnter={handleMouseEnter}
      // onMouseLeave={handleMouseLeave}
    >
      <button onClick={fn} className="sidebar-toggle-btn">
        {isOpen ? "←" : "→"}
      </button>
      <nav>
        <ul
          className={`sidebar-menu overflow-hidden transition-all duration-300 ${isOpen ? "opacity-100" : "opacity-0"
            }`}
        >
          <div>
            <li>
              <Link
                to="/"
                className={`sidebar-link ${location.pathname === "/" ? "active" : ""}`}
              >
                <InlineStack gap="200">
                  <Text>Dashboard</Text>
                  <Text>
                    <Badge size="small" tone="success">{ isAdmin ? "Admin" : "Vendor"}</Badge>
                  </Text>
                </InlineStack>

              </Link>
            </li>
            <li>
              <Link
                to="/addNew"
                className={`sidebar-link ${location.pathname === "/addNew" ? "active" : ""
                  }`}
              >
                Add New Product
              </Link>
            </li>
            <li>
              <Link
                to="/products"
                className={`sidebar-link ${location.pathname === "/products" ? "active" : ""
                  }`}
              >
                Products
              </Link>
            </li>
            <li>
              <Link
                to="/inventory"
                className={`sidebar-link ${location.pathname === "/inventory" ? "active" : ""
                  }`}
              >
                Manage Product
              </Link>
            </li>
            <li>
              <Link
                to="/profile"
                className={`sidebar-link ${location.pathname === "/profile" ? "active" : ""
                  }`}
              >
                Profile
              </Link>
            </li>
          </div>
        </ul>
      </nav>
    </div>
  );
};

Sidebar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  fn: PropTypes.func.isRequired,
  setIsOpen: PropTypes.func.isRequired,
};

export default Sidebar;
