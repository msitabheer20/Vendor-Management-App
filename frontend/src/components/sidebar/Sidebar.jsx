import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";
import "./sidebar.css";

const Sidebar = ({ fn, isOpen, setIsOpen }) => {
  const location = useLocation();

  const handleMouseEnter = () => setIsOpen(true);
  const handleMouseLeave = () => setIsOpen(false);

  return (
    <div
      className={`sidebar ${isOpen ? "more-width" : "less-width"}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* <button onClick={fn} className="sidebar-toggle-btn">
        {isOpen ? "←" : "→"}
      </button> */}
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
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/addNewProduct"
                className={`sidebar-link ${location.pathname === "/addNewProduct" ? "active" : ""
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
                Manage Inventory
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
