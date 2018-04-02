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
                    <span className="Legend--color" style={{ backgroundColor: colors[labelIndex % colors.length]  }} />
                    <span className="Legend--label">{ label }</span>
                </div>
            );
        }) }
    </div>
);

const ChartsItem = ({classNameMod, style, color, item, itemIndex}) => {
    classNameMod = classNameMod ? ` ${classNameMod}`: '';
    return (
        <div
            className={`Charts--item${classNameMod}`}
            style={ style }
            key={ itemIndex }
        >
            <b style={{ color: color }}>{ item }</b>
        </div>
    );
};

const GetChartsSerie = props => {
    let sortedSerie = props.serie.slice(0);
    let sum = props.serie.reduce((carry, current) => carry + current, 0);
    sortedSerie.sort(compareNumbers);

    return (
        <div>
            {props.children}
        </div>
    );
};

const ChartsSerie = props => {
    let additionalClassName = props.additionalClassName ? ` ${props.additionalClassName}` : '';
    return (
        <div className={`Charts--serie${additionalClassName}`}
             key={ props.serieIndex }
             style={{height: props.height || 250}}
        >
            <label>{ props.labels[props.serieIndex] }</label>
            {props.children}
        </div>
    )
};

const Charts = props => {

    let additionalClassName = props.additionalClassName ? ` ${props.additionalClassName}` : '';

    return (
        <div className={`Charts${additionalClassName}`}>
            {props.children}
        </div>
    );
};
// ==================================================================

let getSeries = (serie, colors, max) => {
    return serie.map((item, itemIndex) => {

        let color = colors[itemIndex];

        let size = item / (max) * 100;

        let style = {
            backgroundColor: color,
            opacity: item/max + .05,
            zIndex: item,
            height: size + '%'
        };

        return (
            <ChartsItem
                style={style}
                itemIndex={itemIndex}
                color={color}
                item={item}
            />
        );
    })
};


let getChartsSerie = (serie, serieIndex, labels, colors, max) => {
    let sortedSerie = serie.slice(0);
    let sum = serie.reduce((carry, current) => carry + current, 0);
    sortedSerie.sort(compareNumbers);

    return (
        <ChartsSerie serieIndex={serieIndex} labels={labels} >
            {getSeries (serie, colors, max)}
        </ChartsSerie>
    );
};

let chartsContent = (data, labels, colors, max) => {
    return data.map((serie, serieIndex) => getChartsSerie(serie, serieIndex, labels, colors, max))
};


// ==================================================================

let getSeries1 = (serie, colors, max, sum) => {
    return serie.map((item, itemIndex) => {

        let color = colors[itemIndex];

        let size = item / sum * 100;

        let style = {
            backgroundColor: color,
            opacity: 1,
            zIndex: item,
            height: size + '%'
        };

        return (
            <ChartsItem
                classNameMod={'stacked'}
                style={style}
                itemIndex={itemIndex}
                color={color}
                item={item}
            />
        );
    })
};


let getChartsSerie1 = (serie, serieIndex, labels, colors, max) => {
    let sortedSerie = serie.slice(0);
    let sum = serie.reduce((carry, current) => carry + current, 0);
    sortedSerie.sort(compareNumbers);

    return (
        <ChartsSerie additionalClassName={'stacked'} serieIndex={serieIndex} labels={labels} >
            {getSeries1 (serie, colors, max, sum)}
        </ChartsSerie>
    );
};

let chartsContent1 = (data, labels, colors, max) => {
    return data.map((serie, serieIndex) => getChartsSerie1(serie, serieIndex, labels, colors, max))
};

// ==================================================================

let getSeries2 = (serie, colors, max, sortedSerie) => {
    return serie.map((item, itemIndex) => {

        let color = colors[itemIndex];

        let size = item / (max) * 100;

        let style = {
            backgroundColor: color,
            opacity: (item/max + .05),
            zIndex: item,
            height: size + '%',
            right: ((sortedSerie.indexOf(item) / (serie.length + 1)) * 100) + '%'
        };

        return (
            <ChartsItem
                classNameMod={'layered'}
                style={style}
                itemIndex={itemIndex}
                color={color}
                item={item}
            />
        );
    })
};

let getChartsSerie2 = (serie, serieIndex, labels, colors, max) => {
    let sortedSerie = serie.slice(0);
    let sum = serie.reduce((carry, current) => carry + current, 0);
    sortedSerie.sort(compareNumbers);

    return (
        <ChartsSerie additionalClassName={'layered'} serieIndex={serieIndex} labels={labels} >
            {getSeries2 (serie, colors, max, sortedSerie)}
        </ChartsSerie>
    );
};

let chartsContent2 = (data, labels, colors, max) => {
    // return data.map((serie, serieIndex) => {
    //     return (
    //         <GetChartsSerie serie={serie}>
    //             <ChartsSerie additionalClassName={'layered'} serieIndex={serieIndex} labels={labels}>
    //                 {getSeries2 (serie, colors, max)}
    //             </ChartsSerie>
    //         </GetChartsSerie>
    //     )
    // })
    return data.map((serie, serieIndex) => getChartsSerie2(serie, serieIndex, labels, colors, max))
};

// ==================================================================

let getSeries3 = (serie, colors, max) => {
    return serie.map((item, itemIndex) => {
        let color = colors[itemIndex], style,
            size = item / (max) * 100;

        style = {
            backgroundColor: color,
            opacity: (item/max + .05),
            zIndex: item,
            width: size + '%'
        };

        return (
            <ChartsItem
                style={style}
                itemIndex={itemIndex}
                color={color}
                item={item}
            />
        );
    })
};

let chartsContent3 = (data, labels, colors, max, series) => {
    return data.map((serie, serieIndex) => {
        return (
            <GetChartsSerie serie={serie}>
                <ChartsSerie serieIndex={serieIndex} labels={series} height={'auto'} >
                    {getSeries3 (serie, colors, max)}
                </ChartsSerie>
            </GetChartsSerie>
        )
    })
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

	render() {
		const { data, colors, labels, series } = this.state;
		const max = data.reduce((max, serie) => Math.max(max, serie.reduce((serieMax, item) => Math.max(serieMax, item), 0)), 0);

		return (
			<section>

                <Charts>
                    {chartsContent(data, labels, colors, max)}
                </Charts>

                <Charts>
                    {chartsContent1(data, labels, colors, max)}
                </Charts>

                <Charts>
                    {chartsContent2(data, labels, colors, max)}
                </Charts>

                <Charts additionalClassName="horizontal">
                    {data.map((serie, serieIndex) => {
                        return (
                            <GetChartsSerie serie={serie}>
                                <ChartsSerie serieIndex={serieIndex} labels={series} height={'auto'} >
                                    {getSeries3 (serie, colors, max)}
                                </ChartsSerie>
                            </GetChartsSerie>
                        )
                    })}
                </Charts>

				<Legend labels={labels} colors={colors} />

			</section>
		);
	}
}

