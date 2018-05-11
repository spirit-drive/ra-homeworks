const TextRenderLine = ({value, onChange}) => {

    let onChangeHandler = event => onChange(event.currentTarget.value.toLowerCase().match(/[a-z\n]*/g).join(''));

    return (
        <div className="type-text">
            <textarea
                value={value}
                onChange={onChangeHandler}
                name="text"
                id="font-text"
                cols="30"
                rows="2"
                placeholder="Введите текст для футболки"
            />
        </div>
    );
};
