'use strict';

function createWrapper(Component, className, label) {
    return function (props) {
        return (
            <div className={className}>
                <span className="label">{label}</span>
                {Component.call(this, props)}
            </div>
        )
    }
}
