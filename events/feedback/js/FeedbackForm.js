'use strict';
let nameInput, emailInput, snacksChecked, salutationRadio, textArea, subjectSelect;

const FeedbackForm = ({data, onSubmit}) => {

    function onSubmitFunc(event) {
        event.preventDefault();

        let outputs = JSON.stringify({
            salutation: salutationRadio.querySelector('input:checked').value,
            name: nameInput.value,
            email: emailInput.value,
            subject: subjectSelect.value,
            message: textArea.value,
            snacks: Array.from(snacksChecked.querySelectorAll('input:checked'), item => item.value)
        });

        onSubmit(outputs);

    }

    return (
        <form
            className="content__form contact-form"
            onSubmit={onSubmitFunc}
        >
            <Header />
            <OptionSalutation salutation={data.salutation} />
            <Name name={data.name} />
            <Email email={data.email} />
            <Subject subject={data.subject}/>
            <Message message={data.message} />
            <CheckboxGroup snacks={data.snacks}/>
            <Submit />
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

    let checked;
    // Только если есть приветствие имеет смысл проверять

    if (salutation) {
        ['Мистер', 'Мисис', 'Мис'].forEach((item, i) => {
            if (salutation === item) {
                checked = i;
            }
        });
    }

    return (
        <div className="contact-form__input-group" ref={element => salutationRadio = element}>
            <input className="contact-form__input contact-form__input--radio" defaultChecked={checked === 0} id="salutation-mr" name="salutation" type="radio" value="Мистер"/>
            <label className="contact-form__label contact-form__label--radio" htmlFor="salutation-mr">Мистер</label>
            <input className="contact-form__input contact-form__input--radio" defaultChecked={checked === 1} id="salutation-mrs" name="salutation" type="radio" value="Мисис"/>
            <label className="contact-form__label contact-form__label--radio" htmlFor="salutation-mrs">Мисис</label>
            <input className="contact-form__input contact-form__input--radio" defaultChecked={checked === 2} id="salutation-ms" name="salutation" type="radio" value="Мис"/>
            <label className="contact-form__label contact-form__label--radio" htmlFor="salutation-ms">Мис</label>
        </div>
    );
};

const Name =({name}) => {
    return (
        <div className="contact-form__input-group">
            <label className="contact-form__label" htmlFor="name">Имя</label>
            <input
                className="contact-form__input contact-form__input--text"
                id="name"
                name="name"
                type="text"
                defaultValue={name}
                ref={element => nameInput = element}
            />
        </div>
    )
};

const Email = ({email}) => {
    return (
        <div className="contact-form__input-group">
            <label className="contact-form__label" htmlFor="email">Адрес электронной почты</label>
            <input
                className="contact-form__input contact-form__input--email"
                id="email"
                name="email"
                type="email"
                defaultValue={email}
                ref={element => emailInput = element}
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
                defaultValue={subject}
                ref={element => subjectSelect = element}
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
                defaultValue={message}
                ref={element => textArea = element}
            />
        </div>
    )
};

const CheckboxGroup = ({snacks}) => {

    function getChecked(item, snacks) {

        // Завершаем функцию, если нет такого элемента
        if (!snacks) {return}

        for (let snack of snacks) {
            // Если независимо от регистра совпадают, значит выбранно
            if (item.toUpperCase() === snack.toUpperCase()) {
                return true;
            }
        }

        return;
    }

    return (
        <div className="contact-form__input-group" ref={element => snacksChecked = element}>
            <p className="contact-form__label--checkbox-group">Хочу получить:</p>
            <input className="contact-form__input contact-form__input--checkbox" defaultChecked={getChecked('Пиццу', snacks)} id="snacks-pizza" name="snacks" type="checkbox" value="пицца"/>
            <label className="contact-form__label contact-form__label--checkbox" htmlFor="snacks-pizza">Пиццу</label>
            <input className="contact-form__input contact-form__input--checkbox" defaultChecked={getChecked('Пирог', snacks)} id="snacks-cake" name="snacks" type="checkbox" value="пирог"/>
            <label className="contact-form__label contact-form__label--checkbox" htmlFor="snacks-cake">Пирог</label>
        </div>
    )
};

const Submit = () => <button className="contact-form__button" type="submit">Отправить сообщение!</button>;
