import { Card, Text } from "@shopify/polaris";
import "./card.css"; // Ensure this is correctly imported

const PolarisCard = () => {
    return (
        <div className="card-item">
            <Card sectioned>
                <Text variant="headingMd" as="p">This is a card</Text>
            </Card>
        </div>
    );
};

export default PolarisCard;
