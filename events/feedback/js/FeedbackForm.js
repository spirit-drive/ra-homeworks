'use strict';

const FeedbackForm = ({data}) => {
    return (
        <form className="content__form contact-form">
            <Header />
            <OptionSalutation salutation={data.salutation} />
            <Name name={data.name} />
            <Email email={data.email} />
            <Subject subject={data.subject}/>
            <Message message={data.message} />
            <CheckboxGroup snacks={data.snacks}/>
            <button className="contact-form__button" type="submit">Отправить сообщение!</button>
            <output id="result" />
        </form>
    )
};

FeedbackForm.propTypes = {
    // Это правильно?
    data: PropTypes.shape({
        salutation: PropTypes.string,
        name: PropTypes.object, // Почему это объект? В дз написано, что это объект, но ведь это строка
        subject: PropTypes.oneOf(['У меня проблема', 'У меня важный вопрос']), // Это правильно?
        message: PropTypes.string,
        email: PropTypes.string,
        snacks: PropTypes.arrayOf(PropTypes.string)
    }),
    onSubmit: PropTypes.func,
};
FeedbackForm.defaultProps = {
    data: {},
};

const Header = () => <div className="testing"><p>Чем мы можем помочь?</p></div>;

const OptionSalutation = ({salutation}) => {

    // Можно, конечно, input обернуть в label, но интересно сделать так
    const result = getDualArray(['Мистер', 'Миссис', 'Мис']).map((item, i) => {
        return i % 2 ? (
            <label className="contact-form__label contact-form__label--radio" htmlFor="salutation-mr">{item}</label>
        ) : (
            <input
                className="contact-form__input contact-form__input--radio"
                id="salutation-mr"
                checked={item === salutation ? true : null}
                name="salutation"
                type="radio"
                value={item}
            />
        )
    });

    return (
        <div className="contact-form__input-group">
            {result}
        </div>
    )
};

class Name extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: props.name
        }
    }

    render() {
        const handler = e => {
            this.setState({
                name: e.currentTarget.value
            })
        };
        return (
            <div className="contact-form__input-group">
                <label className="contact-form__label" htmlFor="name">Имя</label>
                <input
                    className="contact-form__input contact-form__input--text"
                    id="name"
                    name="name"
                    type="text"
                    value={this.state.name}
                    onChange={handler}
                />
            </div>
        )
    }

}

const Email = ({email}) => {
    return (
        <div className="contact-form__input-group">
            <label className="contact-form__label" htmlFor="email">Адрес электронной почты</label>
            <input
                className="contact-form__input contact-form__input--email"
                id="email"
                name="email"
                type="email"
                value={email}
            />
        </div>
    )
};

const Subject = ({subject}) => {
    return (
        <div className="contact-form__input-group">
            <label className="contact-form__label" htmlFor="subject">Чем мы можем помочь?</label>
            <select
                className="contact-form__input contact-form__input--select"
                id="subject"
                name="subject"
                value={subject}
            >
                <option>У меня проблема</option>
                <option>У меня важный вопрос</option>
            </select>
        </div>
    )
};

const Message = ({message}) => {
    return (
        <div className="contact-form__input-group">
            <label className="contact-form__label" htmlFor="message">Ваше сообщение</label>
            <textarea
                className="contact-form__input contact-form__input--textarea"
                id="message"
                name="message"
                rows="6"
                cols="65"
                value={message}
            />
        </div>
    )
};

const CheckboxGroup = ({snacks}) => {

    // Можно, конечно, input обернуть в label, но интересно сделать так
    const result = getDualArray(['пиццу', 'пирог']).map((item, i) => {
        return i % 2 ? (
            <label className="contact-form__label contact-form__label--checkbox" htmlFor="snacks-pizza">{item}</label>
        ) : (
            <input
                className="contact-form__input contact-form__input--checkbox"
                id="snacks-pizza"
                name="snacks"
                type="checkbox"
                checked={getCheckedForSnacks(item, snacks)}
                value={item}
            />
        )
    });

    return (
        <div className="contact-form__input-group">
            <p className="contact-form__label--checkbox-group">Хочу получить:</p>
            {result}
        </div>
    )
};

function getDualArray(array) {
    // Создаю пустой вспомогательный массив
    let dualArray = [];

    // Бегу по массиву, создавая массив с дубликатами значений
    array.forEach(item => {
        dualArray.push(item);
        dualArray.push(item);
    });

    return dualArray;
}

function getCheckedForSnacks(item, snacks) {
    for (let snack of snacks) {
        if (item === snack) {
            return true;
        }
    }
    return null;
}