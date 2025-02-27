import { useContext } from "react";
import "./profile.css";
import { useNavigate } from "react-router-dom";
import { Page, Badge, Button, Box, InlineStack, Text, Thumbnail, Image, BlockStack } from "@shopify/polaris"
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
        <Page
            title="Vendor's Profile"
            titleMetadata={<Badge tone="success">Paid</Badge>}
            subtitle="know about youself"
            compactTitle
            fullWidth
        >
            <Box className="profile-page">
                <InlineStack blockAlign="center" gap="400">
                    <Image
                        style={{ borderRadius: "50%" }}
                        source="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoFRQjM-wM_nXMA03AGDXgJK3VeX7vtD3ctA&s"
                        width='100px'
                        height='100px'
                        alt='Media image'
                    />
                    <Text variant="heading3xl" as="h2">Welcome, Vendor!</Text>
                </InlineStack>
                <Box className="profile-details">
                    <BlockStack gap="400">
                        <Text variant="heading3xl" fontWeight="bold">name{vendor?.name.toUpperCase()}</Text>
                        <Text variant="bodySm">emial{vendor?.email}</Text>
                        <Text variant="bodyLg">Experienced vendor specializing in handmade beauty products. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolor culpa sint consequatur quibusdam, ducimus facilis aliquam perspiciatis sequi, obcaecati officia voluptatum doloribus asperiores. Aspernatur, quibusdam sit harum odit dolores architecto suscipit explicabo nostrum ullam earum. Ad eaque pariatur nemo. Repudiandae, architecto. Ex voluptates quae aliquam nisi, quos, consectetur eveniet repudiandae ratione soluta iure laudantium qui asperiores hic error quis expedita veniam animi doloremque quisquam ipsum aperiam! Possimus eveniet perferendis voluptates architecto laudantium. Sint explicabo harum necessitatibus iusto dolor aliquam cum sapiente. Quisquam quia officia eaque? Ut ducimus expedita assumenda labore explicabo dolorem aliquam, recusandae dolore quasi, necessitatibus obcaecati atque quae!</Text>
                    </BlockStack>
                    {/* <h3 className="vendor-name">helo{vendor?.name}</h3> */}
                </Box>
                <InlineStack align="center">
                    <Button variant="primary" onClick={handleLogout} className="logout-button">Logout</Button>
                </InlineStack>
            </Box>
        </Page>
    );
};

export default Profile;
