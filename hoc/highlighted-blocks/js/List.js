'use strict';

const List = props => {
    return props.list.map(item => {
        switch (item.type) {
            case 'video':
                return (
                    item.views < 1000 ? <Video {...item} /> : <Popular {...item} />
                );

            case 'article':
                return (
                    item.views > 100 ? <Article {...item} /> : <New {...item} />
                );
        }
    });
};