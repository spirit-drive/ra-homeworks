const FontSelector = ({fonts, selectedFont, onSelect}) => {

    // Я так и не понял, зачем здесь нужен selectedFont?
    return (
        <div className="font-picker">
            {fonts.map((font, i) => {

                let id = `abc${i + 1}`;
                return (
                <div className="grid center font-item">

                    {/*Какой из вариантов лучше и почему? */}
                    {/*<input onClick={() => {onSelect(font)}} type="radio" name="font" value={id} id={id} />*/}
                    <input onClick={e => {onSelect(JSON.parse(e.currentTarget.value))}} type="radio" name="font" value={JSON.stringify(font)} id={id} />

                    <label htmlFor={id} className="grid-1">
                        <PictureFont text={font.name} path={font.path}/>
                    </label>
                </div>

            )})}
        </div>
    )
};