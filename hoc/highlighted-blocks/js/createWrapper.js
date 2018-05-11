'use strict';

function withWrapper(WrappedComponent) {
    return class extends React.Component {
        constructor(props) {
            super(props);
        }

        render() {
            if (this.props.type === 'video') {
                if (this.props.views >= 1000) {
                    return <Popular><WrappedComponent {...this.props} /></Popular>
                }
                return <WrappedComponent {...this.props} />;
            }
            if (this.props.type === 'article') {
                if (this.props.views <= 100) {
                    return <New><WrappedComponent {...this.props} /></New>
                }
                return <WrappedComponent {...this.props} />;
            }
        }
    };
}