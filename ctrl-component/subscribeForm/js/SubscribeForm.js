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

const InputEmail = ({onChange}) => {
    return (
        <input
            onChange={onChange}
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
        };

        this.onChange = this.onChangeEmail.bind(this);
    }

    onChangeEmail (event) {
        this.setState({
            condition: event.currentTarget.validity.valid
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
                        <InputEmail onChange={this.onChange}/>
                    </FormGroup>
                </Form>
            </div>
        )
    }
}