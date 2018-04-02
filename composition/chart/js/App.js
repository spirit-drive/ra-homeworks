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

// class App extends React.Component {
//     // const {serieIndex, serie, series, colors, max} = props;
//     render () {
//         return (
//             <div className="Charts--serie"
//                  key={ serieIndex }
//                  style={{ height: 'auto' }}
//             >
//                 <label>{ series[serieIndex] }</label>
//                 { serie.map((item, itemIndex) => {
//
//                     let color = colors[itemIndex];
//
//                     let size = item / (max) * 100;
//
//                     let style = {
//                         backgroundColor: color,
//                         opacity: (item/max + .05),
//                         zIndex: item,
//                         width: size + '%'
//                     };
//                     console.log(this);
//                     return (
//                         <ChartsItem
//                             style={style}
//                             itemIndex={itemIndex}
//                             color={color}
//                             item={item}
//                         />
//                     );
//                 }) }
//             </div>
//         );
//     }
// };

const ChartsSerie = (props) => {
// ChartsSerie = ({serieIndex, serie, series, colors, max}) => {

    return (
        <div className="Charts--serie"
             key={ props.serieIndex }
             style={{ height: 'auto' }}
        >
            <label>{ props.series[props.serieIndex] }</label>
            { props.serie.map((item, itemIndex) => {

                let color = props.colors[itemIndex];

                let size = item / (props.max) * 100;

                let style = {
                    backgroundColor: color,
                    opacity: (item/props.max + .05),
                    zIndex: item,
                    width: size + '%'
                };
                console.log(props);
                // return props.children[];
                return (
                    <ChartsItem
                        style={style}
                        itemIndex={itemIndex}
                        color={color}
                        item={item}
                    />
                );
            }) }
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

	render() {
		const { data, colors, labels, series } = this.state;
		const max = data.reduce((max, serie) => Math.max(max, serie.reduce((serieMax, item) => Math.max(serieMax, item), 0)), 0);

		return (
			<section>

				<div className="Charts">
				  { data.map((serie, serieIndex) => {
					let sortedSerie = serie.slice(0);
					let sum = serie.reduce((carry, current) => carry + current, 0);
					sortedSerie.sort(compareNumbers);

					return (
					  <div className="Charts--serie"
						key={ serieIndex }
						style={{height: 250}}
					  >
						  <label>{ labels[serieIndex] }</label>
						  { serie.map((item, itemIndex) => {

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
						  }) }
					  </div>
					);
				  }) }
				</div>

				<div className="Charts">
					{ data.map((serie, serieIndex) => {
						let sortedSerie = serie.slice(0);
						let sum = serie.reduce((carry, current) => carry + current, 0);
						sortedSerie.sort(compareNumbers);

						return (
							<div className="Charts--serie stacked"
								key={ serieIndex }
								style={{ height: 250 }}
							>
								<label>{ labels[serieIndex] }</label>
								{ serie.map((item, itemIndex) => {

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
								}
							</div>
						);
					}) }
				</div>

				<div className="Charts">
					{ data.map((serie, serieIndex) => {
						let sortedSerie = serie.slice(0);
						let sum = serie.reduce((carry, current) => carry + current, 0);
						sortedSerie.sort(compareNumbers);

						return (
							<div className="Charts--serie layered"
								key={ serieIndex }
								style={{ height: 250 }}
							>
								<label>{ labels[serieIndex] }</label>
								{ serie.map((item, itemIndex) => {

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
								}) }
							</div>
						);
					}) }
				</div>

				<div className="Charts horizontal">
                    { data.map((serie, serieIndex) => {
                        let sortedSerie = serie.slice(0),
                            sum;

                        sum = serie.reduce((carry, current) => carry + current, 0);
                        sortedSerie.sort(compareNumbers);

                        return (
                            <div className="Charts--serie"
                                 key={ serieIndex }
                                 style={{ height: 'auto' }}
                            >
                                <label>{ series[serieIndex] }</label>
                                { serie.map((item, itemIndex) => {
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
                                }) }
                            </div>
                        );
                    }) }
				</div>

				<Legend labels={labels} colors={colors} />

			</section>
		);
	}
}

