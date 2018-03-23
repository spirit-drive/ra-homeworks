'use strict';

function getDataCatalogAndToStart(url, callback) {
    fetch(url)
        .then((res) => res.json())
        .then((data) => callback(data));
}

function start(data) {

    function Item({item}) {

        function getPrice(currencyCode, price) {
            let resultPrice;
            switch (currencyCode){
                case "USD":
                    resultPrice = `$${price}`;
                    break;
                case "EUR":
                    resultPrice = `€${price}`;
                    break;
                default:
                    resultPrice = `${price} GBP`
            }
            return resultPrice;
        };

        function getSizeForClassNameQuantity(quantity) {

            if (quantity <= 10){
                return "low";
            } else if (quantity > 10 && quantity <= 20) {
                return "medium";
            } else if (quantity > 20) {
                return "high";
            }

        };

        function getTitle(text) {

            if (text.length > 50){
                return `${text.slice(0, 50)}...`
            }

            return text;
        };


        return (
            <div className="item">
                <div className="item-image">
                    <a href={item.url}>
                        <img src={item.MainImage.url_570xN} />
                    </a>
                </div>
                <div className="item-details">
                    <p className="item-title">{getTitle(item.title)}</p>
                    <p className="item-price">{getPrice(item.currency_code, item.price)}</p>
                    {/*Хочу получить комментарий по поводу следующей строки, рекомендуется ли так делать или нет?*/}
                    <p className={`item-quantity level-${getSizeForClassNameQuantity(item.quantity)}`}>{item.quantity} left</p>
                </div>
            </div>
        );
    };

    function Listing({items}) {
        let itemList = items.map(item => <Item key={item.listing_id} item={item} />);

        return <div className="item-list">{itemList}</div>
    };

    ReactDOM.render(
        <Listing items={data} />,
        document.getElementById('root')
    );
}

getDataCatalogAndToStart('https://neto-api.herokuapp.com/etsy' , start);

// getDataCatalogAndToStart('./products.json' , start);



// Интересный пример работы
// (async function() {
//     let data = await fetch('./products.json');
//     console.log(await data.json());
// })();
