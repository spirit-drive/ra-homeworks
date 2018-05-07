const TextRenderLine = ({value, onChange}) => {
    return (
        <div className="type-text">
            <textarea
                value={value}
                onChange={event => onChange(event.currentTarget.value)}
                name="text"
                id="font-text"
                cols="30"
                rows="2"
                placeholder="Введите текст для футболки"
            />
        </div>
    );
};
