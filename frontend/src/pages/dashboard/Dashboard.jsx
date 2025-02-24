import Card from "../../components/card/Card";
import ShopifyTable from "../../components/shopifyTable/ShopifyTable";


const Dashboard = () => {
    return (
        <>
            <div>

            <div style={{ display: 'flex', gap: "50px", flexWrap: 'wrap', justifyContent: "space-around"}}>
                <Card />
                <Card />
                <Card />
                {/* Dashboard */}
                </div>
                
                <ShopifyTable/>
            </div>
        </>
    )
};

export default Dashboard;
