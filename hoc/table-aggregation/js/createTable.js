function createTable(Component, handlerList) {
    return class extends React.Component {
        constructor (props) {
            super(props);
        }

        render () {
            this.props.list = handlerList(this.props);
            return Component.call(this, this.props);

        }
    }
}
