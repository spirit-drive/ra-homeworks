class Cart extends React.Component {
    constructor (props) {
        super(props);
        this.isOpen = false;
        console.log('Cart constructor', this.props.isOpen);

    }

    closeOpen () {
        this.isOpen = true;
    }

    componentWillReceiveProps () {
        console.log('Cart componentWillReceiveProps', this.props.isOpen);
    }

    componentWillUpdate () {
        console.log('Cart componentWillUpdate', this.props.isOpen);
    }

    componentDidUpdate () {
        this.isOpen = this.props.isOpen;
        console.log('Cart componentDidUpdate', this.props.isOpen);
    }

    // На мой взгляд этот вариант с дополнительной фунцией работает прекрасно. Но это дополнительная функция...
    shouldComponentUpdate () {

        // console.log('Cart shouldComponentUpdate', this.props.isOpen);

        if (this.isOpen) {

            this.isOpen = false;
            return true;

        } else if (this.prevItems !== this.props.items && this.props.isOpen) {

            this.prevItems = this.props.items;
            return true;

        } else {

            return false
        }
    }

    // shouldComponentUpdate () {
    //     /* Я не знаю, как здесь сделать условие, которое бы отвечало всем требованиям.
    //     * В данном случае корзина откроется только с 3-го нажатия.
    //     * Если убрать проверку this.props.isOpen, но будет открыватья нормально, однако и отрисовываться будет каждый раз.
    //     * Подскажите как выполнить задачу, я не понимаю.
    //     */
    //     if (this.prevState !== this.props.isOpen ) {
    //
    //         this.prevState = this.props.isOpen;
    //         return true;
    //
    //     } else if (this.props.isOpen && this.prevItems !== this.props.items) {
    //
    //         this.prevItems = this.props.items;
    //         return true;
    //
    //     } else {
    //         return false;
    //     }
    // }


    render() {
        console.log('render');
        return (
            <CartView {...this.props} closeOpen={this.closeOpen.bind(this)}/>
        );
    }

}
