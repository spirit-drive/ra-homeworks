'use strict';

const itemsRender = items => {
    let getColor = type => {
        switch(type) {
            case 'unisex':
                return "black";
            case 'male':
                return "blue";
            case 'female':
                return "orange";
        }
    };
    return items.map(item => <Item color={getColor(item.type)} item={item} />);
};

const App = ({items}) => (
    <main>
        {itemsRender(items)}
    </main>
);
