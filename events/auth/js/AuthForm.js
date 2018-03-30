'use strict';

let nameI, email, password;
const AuthForm = ({onAuth}) => {
    const onSubmit = event => {
        event.preventDefault();

        // Почему когда я присваиваю имя "name" не работает. name - это какой-то другой html object
        nameI = nameI.value;
        email = email.value;
        password = password.value;
        if (onAuth && typeof onAuth === 'function'){
            onAuth({
                name: nameI,
                email,
                password,
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
            <InputName />
            <InputEmail />
            <InputPassword />
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

const InputName = () => {
    return (
        <div className="Input">
            <input
                required
                type="text"
                placeholder="Имя"
                ref={element => nameI = element}
            />
            <label />
        </div>
    )
};

const InputEmail = () => {
    
    const onChange = e => e.currentTarget.value = e.currentTarget.value.match(/[a-zA-Z1-9@\-\_\.]*/g).join('');

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

const InputPassword = () => {

    const onChange = e => e.currentTarget.value = e.currentTarget.value.match(/[a-zA-Z1-9\_]*/g).join('');

    return (
        <div className="Input">
            <input
                required
                type="password"
                placeholder="Пароль"
                ref={element => {password = element}}
                onChange={onChange}

            />
            <label />
        </div>
    )
};
