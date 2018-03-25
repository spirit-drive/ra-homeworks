'use strict';

(function () {

    // const url = './products.json'; // Можно получить данные из локального файла
    const url = 'https://neto-api.herokuapp.com/etsy';

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

    const Item = ({item}) => {

        let title = methods.getTitle(item.title);
        let price = methods.getPrice(item.currency_code, item.price);
        let sizeForClassNameQuantity = methods.getSizeForClassNameQuantity(item.quantity);

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
                    <p className={`item-quantity level-${sizeForClassNameQuantity}`}>{item.quantity} left</p>
                </div>
            </div>
        );
    };

    Item.propTypes = {
        item: PropTypes.object
    };
    Item.defaultProps = {
        item: {},
    };

    const Listing = ({items}) => {
        let itemList = items.map(item => <Item key={item.listing_id} item={item} />);
        return <div className="item-list">{itemList}</div>
    };

    Listing.propTypes = {
        items: PropTypes.arrayOf(PropTypes.object)
    };
    Listing.defaultProps = {
        items: [],
    };

    function renderCatalog(data) {
        ReactDOM.render(
            <Listing items={data} />,
            document.getElementById('root')
        );
    }

    function getDataCatalog(url, callback) {
        fetch(url)
            .then(res => res.json())
            .then(data => callback(data))
            .catch(e => console.log(e));
    }

    getDataCatalog(url , renderCatalog);

// Интересный пример работы. Стоит ли использовать это? Конечно, это бы упростило код
//     (async function() {
//         try {
//             let data = await fetch(url);
//             ReactDOM.render(
//                 <Listing items={await data.json()} />,
//                 document.getElementById('root')
//             );
//         } catch(e) {
//             console.log(e);
//         }
//     })();
}());