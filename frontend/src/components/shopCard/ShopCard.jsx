import "./shopCard.css"

const ShopCard = () => {

    return (
        <div className="card-container">
            <div>
                <p className="shop-text">Shop id : 123456</p>
                <h1 className="shop-name">Store Name</h1>
            </div>

            <div>
                <p className="owner-txt">Owner : </p>
                <h2 className="owner-name">Jonathon Smith</h2>
                <p className="owner-loc">California, <span>U.S</span></p>
            </div>
            <button className="product-link">See Products -&gt;</button>
        </div>
    )
}

export default ShopCard
