'use strict';

const ItemsForColor = ({items}) => {
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
    return (
        <div>
            {items.map(item => <Item color={getColor(item.type)} item={item} />)}
        </div>
    )
};

const App = ({items}) => (
    <main>
        <ItemsForColor items={items} />
    </main>
);
