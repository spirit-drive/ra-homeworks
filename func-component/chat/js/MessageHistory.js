'use strict';

// Не совсем понятна формулировка "по умолчанию пустой массив", но, думаю это: "{list = []}"
function MessageHistory({list = []}) {

    // Если массив пустой - отображения не будет
    if (!list.length) {
        return null;
    }

    let listMessage = list.map(
        (item) => {
            /* Хотел бы получить комментарии.
            С помощью тренарного оператора минимум кода, но не очень читабельно
            С помощью switch читабельно, но много кода
            Каким способом лучше пользоваться?
             */

            // const CommonMessage = item.type === 'response' ? Response :
            //     item.type === 'message' ? Message : Typing;

            let CommonMessage;
            /* На что-нибудь в данном случае влияет const или let?
            для switch только let в данном случае возможен
             */

            switch (item.type) {

                case 'response':
                    CommonMessage = Response;
                    break;

                case 'message':
                    CommonMessage = Message;
                    break;

                case 'typing':
                    CommonMessage = Typing;
                    break;

                default:
                    return null;
            }

            return <CommonMessage key={item.id} from={item.from} message={item} />;
        }
    );

    return <ul>{listMessage}</ul>;
}