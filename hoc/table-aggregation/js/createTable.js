function createTable(Component, handlerList) {
    return function (props) {
        props.list = handlerList(props);
        return Component.call(this, props);
    }
}
