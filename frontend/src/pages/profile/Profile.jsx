import { useContext } from "react";
import "./profile.css";
import { useNavigate } from "react-router-dom";
import VendorContext from "../../context/VendorContext";

const Profile = () => {

    const { vendor, loading } = useContext(VendorContext);
    const navigate = useNavigate();

    if (loading) {
        return <p>Loading...</p>;
    }

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/signin");
    };

    return (
        <div className="profile-page">
            <header className="profile-header">
                <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoFRQjM-wM_nXMA03AGDXgJK3VeX7vtD3ctA&s"
                    alt="User"
                    className="profile-image"
                />
                <h2 className="welcome">Welcome, Vendor!</h2>
            </header>
            <main className="profile-details">
                <h3 className="vendor-name">{vendor.name}</h3>
                <p>{ vendor.email }</p>
                <p>Experienced vendor specializing in handmade beauty products. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolor culpa sint consequatur quibusdam, ducimus facilis aliquam perspiciatis sequi, obcaecati officia voluptatum doloribus asperiores. Aspernatur, quibusdam sit harum odit dolores architecto suscipit explicabo nostrum ullam earum. Ad eaque pariatur nemo. Repudiandae, architecto. Ex voluptates quae aliquam nisi, quos, consectetur eveniet repudiandae ratione soluta iure laudantium qui asperiores hic error quis expedita veniam animi doloremque quisquam ipsum aperiam! Possimus eveniet perferendis voluptates architecto laudantium. Sint explicabo harum necessitatibus iusto dolor aliquam cum sapiente. Quisquam quia officia eaque? Ut ducimus expedita assumenda labore explicabo dolorem aliquam, recusandae dolore quasi, necessitatibus obcaecati atque quae!</p>
            </main>
            <footer>
                <button onClick={handleLogout} className="logout-button">Logout</button>
            </footer>
        </div>
    );
};

export default Profile;
