import "./HlaarPage.scss";

const HlaarPage = () => {
    return (
        <div className="hlaar-page">
            <h1>The Hlaar's</h1>

            <h2>Zeenel Hlaar</h2>
            <img
                src={process.env.PUBLIC_URL + "/images/hlaar/Zeenel_Hlaar.jpg"}
                alt="Zeenel Hlaar"
            />
        </div>
    );
};

export default HlaarPage;
