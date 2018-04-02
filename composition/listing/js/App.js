'use strict';

const App = ({items, getColor}) => (
    <main>
        {items.map(item => <Item color={getColor(item.type)} item={item} />)}
    </main>
);
