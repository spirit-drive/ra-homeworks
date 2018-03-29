'use strict';

let name, email, password;
const AuthForm = ({onAuth}) => {
    const onSubmit = event => {
        event.preventDefault();

        if (onAuth && typeof onAuth === 'function'){
            console.log(12);
            onAuth({
                name: name,
                email: email,
                password: password,
            });
        }
    };
    return (
        <form
            className="ModalForm"
            action="/404/auth/"
            method="POST"
            onSubmit={onSubmit}
        >
            <Name />
            <Email />
            <Password />
            <button type="submit">
                <span>Войти</span>
                <i className="fa fa-fw fa-chevron-right" />
            </button>
        </form>
    )
};
AuthForm.propTypes = {
    onAuth: PropTypes.func
};

const Name = () => {
    return (
        <div className="Input">
            <input
                required
                type="text"
                placeholder="Имя"
            />
            <label />
        </div>
    )
};

const Email = () => {
    const onChange = e => {
        e.currentTarget.value = [...e.currentTarget.value].filter(symbol => {
            return (
                (symbol.charCodeAt() >= 48 && symbol.charCodeAt() <= 57)
                ||
                (symbol.charCodeAt() === 45)
                ||
                (symbol.charCodeAt() === 95)
                ||
                (symbol.charCodeAt() === 46)
                ||
                (symbol.charCodeAt() >= 64 && symbol.charCodeAt() <= 90)
                ||
                (symbol.charCodeAt() >= 97 && symbol.charCodeAt() <= 122)
            )
        }).join('');
    };

    return (
        <div className="Input">
            <input
                type="email"
                placeholder="Электронная почта"
                ref={element => email = element}
                onChange={onChange}

            />
            <label />
        </div>
    )
};

const Password = () => {
    const onChange = e => {
        e.currentTarget.value = [...e.currentTarget.value].filter(symbol => {
            return (
                (symbol.charCodeAt() >= 48 && symbol.charCodeAt() <= 57)
                ||
                (symbol.charCodeAt() === 95)
                ||
                (symbol.charCodeAt() >= 65 && symbol.charCodeAt() <= 90)
                ||
                (symbol.charCodeAt() >= 97 && symbol.charCodeAt() <= 122)
            )
        }).join('');

    };

    return (
        <div className="Input">
            <input
                required
                type="password"
                placeholder="Пароль"
                ref={element => password = element}
                onChange={onChange}

            />
            <label />
        </div>
    )
};
