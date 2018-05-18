'use strict';

const AuthForm = ({onAuth}) => {

    const regexpForEmail = /[a-z\d@_.\-]*/ig;
    const regexpForPassword = /[a-z\d_]*/ig;

    const onChange = regexp => e => e.currentTarget.value = e.currentTarget.value.match(regexp).join('');

    const onSubmit = e => {
        e.preventDefault();
        let name = e.currentTarget.name.value;
        let email = e.currentTarget.email.value;
        let password = e.currentTarget.password.value;

        if (onAuth && typeof onAuth === 'function') onAuth({name, email, password});
    };

    return (
        <form className="ModalForm" action="/404/auth/" method="POST" onSubmit={onSubmit}>
            <div className="Input">
                <input required name="name" type="text" placeholder="Имя"/>
                <label />
            </div>
            <div className="Input">
                <input required type="email" name="email" placeholder="Электронная почта" onChange={onChange(regexpForEmail)}/>
                <label />
            </div>
            <div className="Input">
                <input required type="password" name="password" placeholder="Пароль" onChange={onChange(regexpForPassword)}/>
                <label />
            </div>
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

