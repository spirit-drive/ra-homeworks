class Cart extends React.Component {
  constructor (props) {
    super(props);
    this.prevState = this.props.isOpen;
    this.prevItems = this.props.items;
    this.isOpen = false;
  }

  closeOpen () {
      this.isOpen = true;
  }

  shouldComponentUpdate () {
    console.log(this.props.items);
    if (this.isOpen) {

      this.isOpen = false;
      return true;

    } else if (this.prevItems !== this.props.items && this.props.isOpen){

      this.prevItems = this.props.items;
      return true;

    } else {

      return false
    }
  }

  render() {
    console.log('render');
    return (
      <CartView {...this.props} closeOpen={this.closeOpen.bind(this)}/>
    );
  }

}
