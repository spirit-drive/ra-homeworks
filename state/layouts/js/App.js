'use strict';

const VIEW_LIST = "view_list";
const VIEW_MODULE = "view_module";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      icon: VIEW_LIST,
      cardView: true
    }
  }

  onSwitch = () => {
    let cardView = this.state.icon === VIEW_MODULE;
    let icon = cardView ? VIEW_LIST : VIEW_MODULE;
    this.setState({
        icon,
        cardView,
    });
  };

  render() {
    return (
      <div>
        <div className="toolbar">
          <IconSwitch
            icon={this.state.icon}
            onSwitch={this.onSwitch} />
        </div>
        {this.renderLayout(this.state.cardView)}
      </div>
    );
  }

  renderLayout(cardView) {
    if (cardView) {
      return (
        <CardsView
          layout={this.props.layout}
          cards={this.getShopItems(this.props.products, cardView)}
        />
      );
    }
    return <ListView items={this.getShopItems(this.props.products, cardView)} />;
  }

  getShopItems(products, cardView) {

    return products.map(product => {

      const Shop = cardView ? ShopCard : ShopItem;

      return (
        <Shop
          title={product.name}
          caption={product.color}
          img={product.img}
          price={`$${product.price}`}
        />
      )
    });
  }
}
