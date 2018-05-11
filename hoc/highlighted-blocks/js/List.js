'use strict';

const List = props => {
    return props.list.map(item => {
        switch (item.type) {
            case 'video':
                return <WrappedVideo {...item}/>;

            case 'article':
                return <WrappedArticle {...item}/>;
        }
    });
};