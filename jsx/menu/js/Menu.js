'use strict';

const itemLink = (item, index) => {
    return (
        <li key={index}>
            <a key={index} href={item.href}>{item.title}</a>
        </li>
    );
};

const Nav = ({items}) => <nav><ul>{items.map(itemLink)}</ul></nav>;

const Menu = ({items, opened}) => {
    return (
        <div className={`menu${opened ? ' menu-open' : ''}`}>
            <div className="menu-toggle"><span/></div>
            {opened && <Nav items={items} />}
        </div>
    );
};