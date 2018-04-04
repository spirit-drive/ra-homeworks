const Form = ({className, children}) => {
    return (
        <form className={className}>
            <h4 className="form-title">Подписаться:</h4>
            {children}
        </form>
    )
};

const FormGroup = ({children}) => {
    return (
        <div className="form-group">
            <label htmlFor="input-email" className="sr-only">Email</label>
            {children}
            <div className="form-error">Пожалуйста, проверьте корректность адреса электронной почты</div>
            <button type="submit" className="form-next">
                <i className="material-icons">keyboard_arrow_right</i>
            </button>
        </div>
    )
};

const InputEmail = ({onChange, refElem}) => {
    return (
        <input
            onChange={onChange}
            ref={refElem}
            type="email"
            id="input-email"
            placeholder="Email"
            className="form-control"
        />
    )
};

class SubscribeForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            condition: true
        }
    }

    onChangeEmail () {
        this.setState({
            condition: this.inputEmail.validity.valid
        })
    }

    getClassNameForForm () {
        return this.state.condition ? 'form form--subscribe' : 'form form--subscribe is-error'
    }

    render () {
        return (
            <div className="subscribe__form">
                <Form className={this.getClassNameForForm()}>
                    <FormGroup >
                        <InputEmail
                            onChange={this.onChangeEmail.bind(this)}
                            refElem={elem => this.inputEmail = elem}
                        />
                    </FormGroup>
                </Form>
            </div>
        )
    }
}