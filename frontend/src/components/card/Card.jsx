import { Card, Text } from "@shopify/polaris";
import PropTypes from "prop-types"
import "./card.css";

const PolarisCard = ({title}) => {
    return (
        <div className="card-item">
            <Card sectioned>
                <Text variant="headingMd" as="p">{title}</Text>
            </Card>
        </div>
    );
};

PolarisCard.propTypes = {
    title : PropTypes.string.isRequired,
}

export default PolarisCard;
