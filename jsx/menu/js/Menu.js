'use strict';

let Menu = ({items, opened}) => {

    let createLinks = (item, index) => {
        return (
            <li key={index}>
                <a key={index} href={item.href}>{item.title}</a>
            </li>
        );
    };

    if (opened) {
        return (
            <div className="menu menu-open">
                <div className="menu-toggle"><span/></div>
                <nav>
                    <ul>{items.map(createLinks)}</ul>
                </nav>
            </div>
        );
    } else {
        return (
            <div className="menu">
                <div className="menu-toggle"><span/></div>
            </div>
        );
    }
};