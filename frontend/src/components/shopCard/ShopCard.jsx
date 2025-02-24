import { Card, Text, Button, Box } from "@shopify/polaris";

const ShopCard = () => {
    return (
        <Card>
            <Box padding="200">
                <Text as="p" variant="bodyMd">Shop id : 123456</Text>
                <Text as="h1" variant="headingLg">Store Name</Text>
            </Box>
            
            <Box padding="200">
                <Text as="p" variant="bodyMd">Owner :</Text>
                <Text as="h2" variant="headingMd" fontWeight="bold">Jonathon Smith</Text>
                <Text as="p" variant="bodySm">California, <span>U.S</span></Text>
            </Box>
            
            <Box padding="200">
                <Button fullWidth>See Products →</Button>
            </Box>
        </Card>
    );
};

export default ShopCard;
