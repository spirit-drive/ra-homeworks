'use strict';

const AuthForm = ({onAuth}) => {

    let name = null, email = null, password = null;

    const InputName = () => {
        return (
            <div className="Input">
                <input
                    required
                    type="text"
                    placeholder="Имя"
                    ref={element => name = element}
                />
                <label />
            </div>
        )
    };

    const InputEmail = () => {

        const onChange = e => e.currentTarget.value = e.currentTarget.value.match(/[a-zA-Z0-9@_.\-]*/g).join('');

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

        const onChange = e => e.currentTarget.value = e.currentTarget.value.match(/[a-zA-Z0-9_]*/g).join('');

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


    const onSubmit = event => {

        event.preventDefault();

        name = name.value;
        email = email.value;
        password = password.value;

        if (onAuth && typeof onAuth === 'function'){
            onAuth({name, email, password});
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

