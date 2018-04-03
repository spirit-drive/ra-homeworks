function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function compareNumbers(a, b) {
    return a - b;
}

const Legend = ({labels, colors}) => (
    <div className="Legend">
        { labels.map((label, labelIndex) => {
            return (
                <div>
                    <span className="Legend--color" style={{backgroundColor: colors[labelIndex % colors.length]}} />
                    <span className="Legend--label">{label}</span>
                </div>
            );
        }) }
    </div>
);

const ChartsItem = props => {

    if (!props.children) {return null}

    const {style, color, itemIndex, item} = props.children;
    let additionalClassName = props.additionalClassName ? ` ${props.additionalClassName}`: '';

    return (
        <div className={`Charts--item${additionalClassName}`} style={style} key={itemIndex}>
            <b style={{color}}>{ item }</b>
        </div>
    );
};

const ChartsSerie = props => {

    let additionalClassName = props.additionalClassName ? ` ${props.additionalClassName}` : '';

    // Пробрасываем additionalClassName внутрь props дочерних элементов
    props.children.forEach(children => {
        children.props = Object.assign({}, children.props, { additionalClassName });
    });

    return (
        <div className={`Charts--serie${additionalClassName}`} key={ props.serieIndex } style={{height: props.height}}>
            <label>{ props.labels[props.serieIndex] }</label>
            {props.children}
        </div>
    )
};
ChartsSerie.defaultProps = {
    height: 250
};

const Charts = props => {

    let additionalClassName = props.additionalClassName ? ` ${props.additionalClassName}` : '';

    return (
        <div className={`Charts${additionalClassName}`}>
            {props.children}
        </div>
    );
};

class App extends React.Component {
    componentWillMount() {
        this.setState({
            data: [],
            series: ['France', 'Italy', 'England', 'Sweden', 'Germany'],
            labels: ['cats', 'dogs', 'horses', 'ducks', 'cows'],
            colors: ['#43A19E', '#7B43A1', '#F2317A', '#FF9824', '#58CF6C']
        })
    }

    componentDidMount() {
        this.populateArray();
        setInterval(this.populateArray, 2000);
    }

    populateArray = () => {
        const series = 5;
        const serieLength = 5;

        let data = new Array(series).fill(new Array(serieLength).fill(0));
        data = data.map(serie => serie.map(item => getRandomInt(0, 20)));

        this.setState({ data });
    };

    func1 = (colors, item, itemIndex, max, side) => {

        if (colors === undefined || item === undefined || itemIndex === undefined || max === undefined) {
            console.log('func1 не получила обязательных параметров');
            return null;
        }

        let color = colors[itemIndex];
        let size = item / max * 100;
        let style = {
            backgroundColor: color,
            opacity: item / max + .05,
            zIndex: item,
            [side || 'height']: size + '%'
        };

        return {style, color, item, itemIndex}

    };

    func2 = (colors, item, itemIndex, serie) => {

        if (colors === undefined || item === undefined || itemIndex === undefined || serie === undefined) {
            console.log('func2 не получила обязательных параметров');
            return null;
        }

        let sum = serie.reduce((carry, current) => carry + current, 0);
        let color = colors[itemIndex];
        let size = item / sum * 100;
        let style = {
            backgroundColor: color,
            opacity: 1,
            zIndex: item,
            height: size + '%'
        };

        return {style, color, item, itemIndex}

    };

    func3 = (colors, item, itemIndex, serie, max) => {

        if (colors === undefined || item === undefined || itemIndex === undefined || serie === undefined || max === undefined) {
            console.log('func3 не получила обязательных параметров');
            return null;
        }

        let sortedSerie = serie.slice(0).sort(compareNumbers);
        let color = colors[itemIndex];
        let size = item / max * 100;
        let style = {
            backgroundColor: color,
            opacity: (item / max + .05),
            zIndex: item,
            height: size + '%',
            right: ((sortedSerie.indexOf(item) / (serie.length + 1)) * 100) + '%'
        };

        return {style, color, item, itemIndex}

    };

    render() {
        const { data, colors, labels, series } = this.state;
        const max = data.reduce((max, serie) => Math.max(max, serie.reduce((serieMax, item) => Math.max(serieMax, item), 0)), 0);

        return (
            <section>

                <Charts>
                    {data.map((serie, serieIndex) => (
                        <ChartsSerie serieIndex={serieIndex} labels={labels} >
                            {serie.map((item, itemIndex) =>  (
                                <ChartsItem>
                                    {this.func1(colors, item, itemIndex, max)}
                                </ChartsItem>
                            ))}
                        </ChartsSerie>
                    ))}
                </Charts>

                <Charts>
                    {data.map((serie, serieIndex) => (
                        <ChartsSerie additionalClassName="stacked" serieIndex={serieIndex} labels={labels} >
                            {serie.map((item, itemIndex) => (
                                <ChartsItem>
                                    {this.func2(colors, item, itemIndex, serie)}
                                </ChartsItem>
                            ))}
                        </ChartsSerie>
                    ))}
                </Charts>

                <Charts>
                    {data.map((serie, serieIndex) => (
                        <ChartsSerie additionalClassName="layered" serieIndex={serieIndex} labels={labels} >
                            {serie.map((item, itemIndex) => (
                                <ChartsItem>
                                    {this.func3(colors, item, itemIndex, serie, max)}
                                </ChartsItem>
                            ))}
                        </ChartsSerie>
                    ))}
                </Charts>

                <Charts additionalClassName="horizontal">
                    {data.map((serie, serieIndex) => (
                        <ChartsSerie serieIndex={serieIndex} labels={series} height="auto" >
                            {serie.map((item, itemIndex) => (
                                <ChartsItem>
                                    {this.func1(colors, item, itemIndex, max, 'width')}
                                </ChartsItem>
                            ))}
                        </ChartsSerie>
                    ))}
                </Charts>

                <Legend labels={labels} colors={colors} />

            </section>
        );
    }
}