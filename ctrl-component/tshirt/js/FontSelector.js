const FontSelector = ({fonts, selectedFont, onSelect}) => {

    let onClick = font => () => onSelect(font);

    return (
        <div className="font-picker">
            {fonts.map((font, i) => {

                let id = `abc${i + 1}`;
                return (
                <div className="grid center font-item">

                    <input onClick={onClick(font)} type="radio" name="font" value={id} id={id} />

                    <label htmlFor={id} className="grid-1">
                        <PictureFont text={font.name} path={font.path}/>
                    </label>
                </div>

            )})}
        </div>
    )
};