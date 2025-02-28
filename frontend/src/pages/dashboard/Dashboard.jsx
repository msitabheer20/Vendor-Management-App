import ShopifyTable from "../../components/shopifyTable/ShopifyTable";
import { BlockStack, Grid, Layout, LegacyCard, Page } from "@shopify/polaris"

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
				<Layout>
					<BlockStack gap="2400">

						<Grid>
							<Grid.Cell columnSpan={{ xs: 6, sm: 4, md: 4, lg: 4, xl: 4 }}>
								<LegacyCard title="Sales" sectioned>
									<p>View a summary of your online store’s sales.</p>
								</LegacyCard>
							</Grid.Cell>
							<Grid.Cell columnSpan={{ xs: 6, sm: 4, md: 4, lg: 4, xl: 4 }}>
								<LegacyCard title="Orders" sectioned>
									<p>View a summary of your online store’s orders.</p>
								</LegacyCard>
							</Grid.Cell>
							<Grid.Cell columnSpan={{ xs: 6, sm: 4, md: 4, lg: 4, xl: 4 }}>
								<LegacyCard title="Customers" sectioned>
									<p>View a summary of your online store’s customers.</p>
								</LegacyCard>
							</Grid.Cell>
						</Grid>

						<ShopifyTable />
					</BlockStack>
				</Layout>
			</Page >
		</>
	)
};

export default Dashboard;
