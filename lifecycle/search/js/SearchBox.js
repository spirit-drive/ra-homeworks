class SearchBox extends React.Component {

  constructor(props) {
    super(props);
    this.state = { fixed: false };
    this.setPositionClone = this.setPosition.bind(this);
  }



  render() {
    return <SearchBoxView fixed={this.state.fixed} />
  }

  componentDidMount () {
    this.elem = document.getElementsByClassName('container')[0];
    window.addEventListener('scroll', this.setPositionClone);
  }

  componentWillUnmount () {
      window.removeEventListener('scroll', this.setPositionClone);
  }

  isFixed() {
    return window.scrollY >= this.elem.offsetTop;
  }

  setPosition() {
    let fixed = this.isFixed();
    this.setState({fixed})
  }
}
