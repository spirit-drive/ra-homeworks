'use strict';

getColor = type => {
    switch(type) {
        case 'unisex':
            return "black";
        case 'male':
            return "blue";
        case 'female':
            return "orange";
    }
};

const App = ({items}) => (
    <main>
        {items.map(item => <Item color={getColor(item.type)} item={item} />)}
    </main>
);
