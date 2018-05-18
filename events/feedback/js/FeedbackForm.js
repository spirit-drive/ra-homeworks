'use strict';

const FeedbackForm = ({data, onSubmit}) => {

    let nameInput, emailInput, textArea, subjectSelect, form;

    const onSubmitFunc = event => {
        event.preventDefault();
        onSubmit(JSON.stringify({
            salutation: form.salutation.value,
            name: nameInput.value,
            email: emailInput.value,
            subject: subjectSelect.value,
            message: textArea.value,
            snacks: Array.from(form.snacks).filter(item => item.checked).map(item => item.value)
        }));
    };

    return (
        <form
            className="content__form contact-form"
            onSubmit={onSubmitFunc}
            ref={element => form = element}
        >
            <div className="testing"><p>Чем мы можем помочь?</p></div>
            <div className="contact-form__input-group">
                <input className="contact-form__input contact-form__input--radio" defaultChecked={data.salutation === 'Мистер'} id="salutation-mr" name="salutation" type="radio" value="Мистер"/>
                <label className="contact-form__label contact-form__label--radio" htmlFor="salutation-mr">Мистер</label>
                <input className="contact-form__input contact-form__input--radio" defaultChecked={data.salutation === 'Мисис'} id="salutation-mrs" name="salutation" type="radio" value="Мисис"/>
                <label className="contact-form__label contact-form__label--radio" htmlFor="salutation-mrs">Мисис</label>
                <input className="contact-form__input contact-form__input--radio" defaultChecked={data.salutation === 'Мис'} id="salutation-ms" name="salutation" type="radio" value="Мис"/>
                <label className="contact-form__label contact-form__label--radio" htmlFor="salutation-ms">Мис</label>
            </div>
            <div className="contact-form__input-group">
                <label className="contact-form__label" htmlFor="name">Имя</label>
                <input
                    className="contact-form__input contact-form__input--text"
                    id="name"
                    name="name"
                    type="text"
                    defaultValue={data.name}
                    ref={element => nameInput = element}
                />
            </div>
            <div className="contact-form__input-group">
                <label className="contact-form__label" htmlFor="email">Адрес электронной почты</label>
                <input
                    className="contact-form__input contact-form__input--email"
                    id="email"
                    name="email"
                    type="email"
                    defaultValue={data.email}
                    ref={element => emailInput = element}
                />
            </div>
            <div className="contact-form__input-group">
                <label className="contact-form__label" htmlFor="subject">Чем мы можем помочь?</label>
                <select
                    className="contact-form__input contact-form__input--select"
                    id="subject"
                    name="subject"
                    defaultValue={data.subject}
                    ref={element => subjectSelect = element}
                >
                    <option>У меня проблема</option>
                    <option>У меня важный вопрос</option>
                </select>
            </div>
            <div className="contact-form__input-group">
                <label className="contact-form__label" htmlFor="message">Ваше сообщение</label>
                <textarea
                    className="contact-form__input contact-form__input--textarea"
                    id="message"
                    name="message"
                    rows="6"
                    cols="65"
                    defaultValue={data.message}
                    ref={element => textArea = element}
                />
            </div>
            <div className="contact-form__input-group">
                <p className="contact-form__label--checkbox-group">Хочу получить:</p>
                <input className="contact-form__input contact-form__input--checkbox" defaultChecked={data.snacks.includes('пиццу')} id="snacks-pizza" name="snacks" type="checkbox" value="пицца"/>
                <label className="contact-form__label contact-form__label--checkbox" htmlFor="snacks-pizza">Пиццу</label>
                <input className="contact-form__input contact-form__input--checkbox" defaultChecked={data.snacks.includes('пирог')} id="snacks-cake" name="snacks" type="checkbox" value="пирог"/>
                <label className="contact-form__label contact-form__label--checkbox" htmlFor="snacks-cake">Пирог</label>
            </div>
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