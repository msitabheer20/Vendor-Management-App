import Card from "../../components/card/Card";
import ShopifyTable from "../../components/shopifyTable/ShopifyTable";
import { Badge, InlineStack, Page } from "@shopify/polaris"

const Dashboard = () => {

	return (
		<>
			<Page
				title="Vendor's Dashboard"
				subtitle="Overview of entire store"
				compactTitle
				filterActions
				fullWidth
				secondaryActions={[
					{
						content: "View on store",
						accessibilityLabel: "view on store",
						onAction: () => alert("view on store")
					},
				]}
			>
				<div>

					<div style={{ display: 'flex', gap: "50px", flexWrap: 'wrap', justifyContent: "space-around" }}>
						<Card title="Number of Shops:" />
						<Card title="Number of Products:" />
						<Card title="Created At:" />
					</div>

					<ShopifyTable />
				</div>
			</Page >
		</>
	)
};

export default Dashboard;
