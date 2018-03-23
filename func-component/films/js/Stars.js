'use strict';

function Stars({count}) {

    // Если count не число, то преобразуем его в число, если это не удастся, то он не пройдет следующую проверку
    if (typeof count !== 'number') {
        count = parseInt(count, 10);
    }

    // Если не проходит проверку сразу возвращаем null - нет смысла совершать какие-либо действия если проверка не пройдена
    if (!count || count < 1 || count > 5) {

        // У меня webstorm и он выделяет return null как предупреждение и вот что пишет:
        /* Primitive value returned from constructor
        will be lost when called with 'new' less... (Ctrl+F1)
        Checks that function recognized as constructor does not return primitive values.
        When called with new , this value will be lost and object will be returned instead.
        To avoid warnings, you can explicitly specify function's return type with @return tag.
        */
        // Что это значит?
        return null;
    }

    /* Мне не очень нравится такое решение, потому что оно не масштабируемо.
    Но, как я понял - это лучше, чем использовать индексы элемента, в качестве ключа.
    Так как у нас есть ограничение на количество звезд, вижу возможным использование
    заготовленного массива ключей.
    */
    let arrKeys = [
      'vew',
      'svb',
      'vef',
      'nuy',
      'zae',
    ];

    // Создаю массив заданной длинны, заполняю его, чтобы пройтись по нему с помощью map
    let items = Array(count).fill().map((x, i) => <li key={arrKeys[i]}><Star /></li>);

    return <ul className="card-body-stars u-clearfix">{items}</ul>;
}

Stars.propTypes = {
    count: React.PropTypes.number
};
Stars.defaultProps = {
    count: 0,
};