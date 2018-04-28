'use strict';

function createWrapper(Component, className, label) {
    return class extends React.Component {
        constructor (props) {
            super(props);
        }

        render () {
            return (
                <div className={className}>
                    <span className="label">{label}</span>
                    <Component {...this.props} />
                </div>
            )
        }
    }
}
