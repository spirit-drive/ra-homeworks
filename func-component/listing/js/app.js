'use strict';

(function () {
    // const url = './products.json';
    const url = 'https://neto-api.herokuapp.com/etsy';

    const Item = ({item}) => {
        let methods = {

            getPrice(currencyCode, price) {
                let resultPrice;
                switch (currencyCode) {
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
            },

            getSizeForClassNameQuantity(quantity) {

                if (quantity <= 10){
                    return "low";
                } else if (quantity > 10 && quantity <= 20) {
                    return "medium";
                } else if (quantity > 20) {
                    return "high";
                }

            },

            getTitle(text) {

                if (text.length > 50){
                    return `${text.slice(0, 50)}...`
                }

                return text;
            }
        };

        let title = methods.getTitle(item.title);
        let price = methods.getPrice(item.currency_code, item.price);
        let classSizeForQuantity = methods.getSizeForClassNameQuantity(item.quantity);

        return (
            <div className="item">
                <div className="item-image">
                    <a href={item.url}>
                        <img src={item.MainImage.url_570xN} />
                    </a>
                </div>
                <div className="item-details">
                    <p className="item-title">{title}</p>
                    <p className="item-price">{price}</p>
                    <p className={`item-quantity level-${classSizeForQuantity}`}>{item.quantity} left</p>
                </div>
            </div>
        );
    };

    Item.propTypes = {
        item: React.PropTypes.object
    };
    Item.defaultProps = {
        item: {},
    };

    const Listing = ({items}) => {
        let itemList = items.map(item => <Item key={item.listing_id} item={item} />);
        return <div className="item-list">{itemList}</div>
    };

    Listing.propTypes = {
        // "Массив объектов"... можно ли вообще задавать вложенность типизации? Например массив строк, массив объектов?
        items: React.PropTypes.array
    };
    Listing.defaultProps = {
        items: [],
    };

    function getDataCatalog(url, callback) {
        fetch(url)
            .then(res => res.json())
            .then(data => callback(data));
    }

    function renderCatalog(data) {
        ReactDOM.render(
            <Listing items={data} />,
            document.getElementById('root')
        );
    }

    getDataCatalog(url , renderCatalog);

// Интересный пример работы. Стоит ли использовать это? Конечно, это бы упростило код
//     (async function() {
//         let data = await fetch(url);
//         ReactDOM.render(
//             <Listing items={await data.json()} />,
//             document.getElementById('root')
//         );
//     })();
}());