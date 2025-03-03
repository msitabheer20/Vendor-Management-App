import { Card, Text, Button, Box } from "@shopify/polaris";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import PropTypes from 'prop-types';

const fetchShopData = async ({ queryKey }) => {
	const [, id, url, token] = queryKey;
	const response = await axios.get(`http://localhost:5000/api/shop/`, {
		params: { url, token },
	});
	return response.data.shop;
}

const ShopCard = ({ id, url, token }) => {

	const navigate = useNavigate();

	const { data: shopData, isPending, isError } = useQuery({
		queryKey: ["shopData", id, url, token],
		queryFn: fetchShopData,
		staleTime: 1000 * 60 * 5
	})

	const handleViewProducts = () => {
		navigate(`/product/${shopData.id}`, { state: { url, token } });
	};

	if (isPending) {
		return <Text as="p" variant="bodyMd">Loading...</Text>
	}

	if (isError) {
		return <Text as="p" variant="bodyMd" color="critical">Shop unavailable</Text>
	}

	return (
		<Card>
			{shopData ?
				(<>
					<Box padding="200">
						<Text as="p" variant="bodyMd">Shop id : {shopData.id}</Text>
						<Text as="h1" variant="headingLg">{shopData.name}</Text>
					</Box>

					<Box padding="200">
						<Text as="p" variant="bodyMd">Owner :</Text>
						<Text as="h2" variant="headingMd" fontWeight="bold">{shopData.shop_owner}</Text>
						<Text as="p" variant="bodySm">{shopData.province == null ? "City" : shopData.province}, <span>{shopData.country_code}</span></Text>
						<Text as="p" variant="bodySm">{shopData.domain}</Text>
					</Box>

					<Box padding="200">
						<Button fullWidth onClick={handleViewProducts}>See Products →</Button>
					</Box>
				</>) : (
					<Text as="p" variant="bodyMd">No shop data available</Text>
				)
			}
		</Card>
	);
};

ShopCard.propTypes = {
	id: PropTypes.string.isRequired,
	url: PropTypes.string.isRequired,
	token: PropTypes.string.isRequired,
}

export default ShopCard;
