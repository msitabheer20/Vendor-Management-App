import Card from "../../components/card/Card";
import ShopifyTable from "../../components/shopifyTable/ShopifyTable";
import { Badge, InlineStack, Page } from "@shopify/polaris"

const Dashboard = () => {


	return (
		<>
			<Page
				title="Vendor's Dashboard"
				titleMetadata={
					<InlineStack gap="100">
						<Badge progress="complete">Paid</Badge>
						<Badge progress="incomplete" tone="attention">Paid</Badge>
					</InlineStack>
				}
				subtitle="Overview of entire store"
				compactTitle
				filterActions

				secondaryActions={[
					{
						content: "View on store",
						accessibilityLabel: "view on store",
						onAction: () => alert("view on store")
					},
					{
						content: "test action",
						onAction: () => alert("test this action")
					}
				]}

				actionGroups={[
					{
						title: "Subscribe",
						actions: [
							{
								content: "Share",
								accessibilityLabel: "inside subscribe",
								onAction: () => alert("I am inside subscribe")
							},
							{
								content: "Like",
								accessibilityLabel: "inside subscribe",
								onAction: () => alert("I am inside subscribe")
							},
						]
					}
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
