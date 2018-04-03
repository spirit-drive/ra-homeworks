// function getRandomInt(min, max) {
//     return Math.floor(Math.random() * (max - min)) + min;
// }
//
// function compareNumbers(a, b) {
//     return a - b;
// }
//
// class App extends React.Component {
//     componentWillMount() {
//         this.setState({
//             data: [],
//             series: ['France', 'Italy', 'England', 'Sweden', 'Germany'],
//             labels: ['cats', 'dogs', 'horses', 'ducks', 'cows'],
//             colors: ['#43A19E', '#7B43A1', '#F2317A', '#FF9824', '#58CF6C']
//         })
//     }
//
//     componentDidMount() {
//         this.populateArray();
//         setInterval(this.populateArray.bind(this), 2000);
//     }
//
//     populateArray() {
//         const	series = 5;
//         const serieLength = 5;
//
//         let data = new Array(series).fill(new Array(serieLength).fill(0));
//         data = data.map(serie => serie.map(item => getRandomInt(0, 20)));
//
//         this.setState({ data });
//     }
//
//     render() {
//         const { data, colors, labels, series } = this.state;
//         const max = data.reduce((max, serie) => Math.max(max, serie.reduce((serieMax, item) => Math.max(serieMax, item), 0)), 0);
//
//         return (
//             <section>
//                 <div className="Charts">
//                     { data.map((serie, serieIndex) => {
//                         var sortedSerie = serie.slice(0),
//                             sum;
//
//                         sum = serie.reduce((carry, current) => carry + current, 0);
//                         sortedSerie.sort(compareNumbers);
//
//                         return (
//                             <div className="Charts--serie"
//                                  key={ serieIndex }
//                                  style={{height: 250}}
//                             >
//                                 <label>{ labels[serieIndex] }</label>
//                                 { serie.map((item, itemIndex) => {
//                                     var color = colors[itemIndex], style,
//                                         size = item / (max) * 100;
//
//                                     style = {
//                                         backgroundColor: color,
//                                         opacity: item/max + .05,
//                                         zIndex: item,
//                                         height: size + '%'
//                                     };
//
//                                     return (
//                                         <div
//                                             className="Charts--item"
//                                             style={ style }
//                                             key={ itemIndex }
//                                         >
//                                             <b style={{ color: color }}>{ item }</b>
//                                         </div>
//                                     );
//                                 }) }
//                             </div>
//                         );
//                     }) }
//                 </div>
//
//                 <div className="Charts">
//                     { data.map((serie, serieIndex) => {
//                         var sortedSerie = serie.slice(0),
//                             sum;
//
//                         sum = serie.reduce((carry, current) => carry + current, 0);
//                         sortedSerie.sort(compareNumbers);
//
//                         return (
//                             <div className="Charts--serie stacked"
//                                  key={ serieIndex }
//                                  style={{ height: 250 }}
//                             >
//                                 <label>{ labels[serieIndex] }</label>
//                                 { serie.map((item, itemIndex) => {
//                                     var color = colors[itemIndex], style,
//                                         size = item / sum * 100;
//
//                                     style = {
//                                         backgroundColor: color,
//                                         opacity: 1,
//                                         zIndex: item,
//                                         height: size + '%'
//                                     };
//
//                                     return (
//                                         <div
//                                             className="Charts--item stacked"
//                                             style={ style }
//                                             key={ itemIndex }
//                                         >
//                                             <b style={{ color: color }}>{ item }</b>
//                                         </div>
//                                     );
//                                 }) }
//                             </div>
//                         );
//                     }) }
//                 </div>
//
//                 <div className="Charts">
//                     { data.map((serie, serieIndex) => {
//                         var sortedSerie = serie.slice(0),
//                             sum;
//
//                         sum = serie.reduce((carry, current) => carry + current, 0);
//                         sortedSerie.sort(compareNumbers);
//
//                         return (
//                             <div className="Charts--serie layered"
//                                  key={ serieIndex }
//                                  style={{ height: 250 }}
//                             >
//                                 <label>{ labels[serieIndex] }</label>
//                                 { serie.map((item, itemIndex) => {
//                                     var color = colors[itemIndex], style,
//                                         size = item / (max) * 100;
//
//                                     style = {
//                                         backgroundColor: color,
//                                         opacity: (item/max + .05),
//                                         zIndex: item,
//                                         height: size + '%',
//                                         right: ((sortedSerie.indexOf(item) / (serie.length + 1)) * 100) + '%'
//                                     };
//
//                                     return (
//                                         <div
//                                             className="Charts--item layered"
//                                             style={ style }
//                                             key={ itemIndex }
//                                         >
//                                             <b style={{ color: color }}>{ item }</b>
//                                         </div>
//                                     );
//                                 }) }
//                             </div>
//                         );
//                     }) }
//                 </div>
//
//                 <div className="Charts horizontal">
//                     { data.map((serie, serieIndex) => {
//                         var sortedSerie = serie.slice(0),
//                             sum;
//
//                         sum = serie.reduce((carry, current) => carry + current, 0);
//                         sortedSerie.sort(compareNumbers);
//
//                         return (
//                             <div className="Charts--serie"
//                                  key={ serieIndex }
//                                  style={{ height: 'auto' }}
//                             >
//                                 <label>{ series[serieIndex] }</label>
//                                 { serie.map((item, itemIndex) => {
//                                     var color = colors[itemIndex], style,
//                                         size = item / (max) * 100;
//
//                                     style = {
//                                         backgroundColor: color,
//                                         opacity: (item/max + .05),
//                                         zIndex: item,
//                                         width: size + '%'
//                                     };
//
//                                     return (
//                                         <div
//                                             className="Charts--item"
//                                             style={ style }
//                                             key={ itemIndex }
//                                         >
//                                             <b style={{ color: color }}>{ item }</b>
//                                         </div>
//                                     );
//                                 }) }
//                             </div>
//                         );
//                     }) }
//                 </div>
//
//                 <div className="Legend">
//                     { labels.map((label, labelIndex) => {
//                         return (
//                             <div>
//                                 <span className="Legend--color" style={{ backgroundColor: colors[labelIndex % colors.length]  }} />
//                                 <span className="Legend--label">{ label }</span>
//                             </div>
//                         );
//                     }) }
//                 </div>
//             </section>
//         );
//     }
// }



// ===================================================


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

const ChartsItem = ({additionalClassName, style, color, item, itemIndex}) => {
    additionalClassName = additionalClassName ? ` ${additionalClassName}`: '';
    return (
        <div
            className={`Charts--item${additionalClassName}`}
            style={ style }
            key={ itemIndex }
        >
            <b style={{ color: color }}>{ item }</b>
        </div>
    );
};

const ChartsSerie = props => {
    let additionalClassName = props.additionalClassName ? ` ${props.additionalClassName}` : '';
    return (
        <div className={`Charts--serie${additionalClassName}`}
             key={ props.serieIndex }
             style={{height: props.height}}
        >
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

const ChartsItemsFor1 = props => {

    let sortedSerie = props.serie.slice(0);
    let sum = props.serie.reduce((carry, current) => carry + current, 0);
    sortedSerie.sort(compareNumbers);

    let color = props.colors[props.itemIndex];

    let size = props.item / (props.max) * 100;

    let style = {
        backgroundColor: color,
        opacity: props.item/props.max + .05,
        zIndex: props.item,
        height: size + '%'
    };

    return (
        <ChartsItem
            style={style}
            color={color}
            itemIndex={props.itemIndex}
            item={props.item}
            additionalClassName={props.additionalClassName}
        />
    )
};

const ChartsItemsFor2 = props => {

    let sortedSerie = props.serie.slice(0);
    let sum = props.serie.reduce((carry, current) => carry + current, 0);
    sortedSerie.sort(compareNumbers);

    let color = props.colors[props.itemIndex];

    let size = props.item / sum * 100;

    let style = {
        backgroundColor: color,
        opacity: 1,
        zIndex: props.item,
        height: size + '%'
    };

    return (
        <ChartsItem
            style={style}
            color={color}
            itemIndex={props.itemIndex}
            item={props.item}
            additionalClassName={props.additionalClassName}
        />
    )

};

const ChartsItemsFor3 = props => {

    let sortedSerie = props.serie.slice(0);
    let sum = props.serie.reduce((carry, current) => carry + current, 0);
    sortedSerie.sort(compareNumbers);

    let color = props.colors[props.itemIndex];

    let size = props.item / (props.max) * 100;

    let style = {
        backgroundColor: color,
        opacity: (props.item/props.max + .05),
        zIndex: props.item,
        height: size + '%',
        right: ((sortedSerie.indexOf(props.item) / (props.serie.length + 1)) * 100) + '%'
    };

    return (
        <ChartsItem
            style={style}
            color={color}
            itemIndex={props.itemIndex}
            item={props.item}
            additionalClassName={props.additionalClassName}
        />
    )
};

const ChartsItemsForHorizontal = props => {

    let color = props.colors[props.itemIndex];

    let size = props.item / (props.max) * 100;

    let style = {
        backgroundColor: color,
        opacity: (props.item/props.max + .05),
        zIndex: props.item,
        width: size + '%'
    };

    return (
        <ChartsItem
            style={style}
            color={color}
            itemIndex={props.itemIndex}
            item={props.item}
            additionalClassName={props.additionalClassName}
        />
    )
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
                    {data.map((serie, serieIndex) => (
                        <ChartsSerie serieIndex={serieIndex} labels={labels} >
                            {serie.map((item, itemIndex) =>  (
                                <ChartsItemsFor1 serie={serie} item={item} itemIndex={itemIndex} colors={colors} max={max} />
                            ))}
                        </ChartsSerie>
                    ))}
                </Charts>

                <Charts>
                    {data.map((serie, serieIndex) => (
                        <ChartsSerie additionalClassName={'stacked'} serieIndex={serieIndex} labels={labels} >
                            {serie.map((item, itemIndex) => (
                                <ChartsItemsFor2 serie={serie} item={item} itemIndex={itemIndex} colors={colors} max={max} additionalClassName={'stacked'} />
                            ))}
                        </ChartsSerie>
                    ))}
                </Charts>

                <Charts>
                    {data.map((serie, serieIndex) => (
                        <ChartsSerie additionalClassName={'layered'} serieIndex={serieIndex} labels={labels} >
                            {serie.map((item, itemIndex) => (
                                <ChartsItemsFor3 serie={serie} item={item} itemIndex={itemIndex} colors={colors} max={max} additionalClassName={'layered'} />
                            ))}
                        </ChartsSerie>
                    ))}
                </Charts>

                <Charts additionalClassName="horizontal">
                    {data.map((serie, serieIndex) => (
                        <ChartsSerie serieIndex={serieIndex} labels={series} height={'auto'} >
                            {serie.map((item, itemIndex) => (
                                <ChartsItemsForHorizontal item={item} itemIndex={itemIndex} colors={colors} max={max} />
                            ))}
                        </ChartsSerie>
                    ))}
                </Charts>

                <Legend labels={labels} colors={colors} />

            </section>
        );
    }
}




// ===================================================



// function getRandomInt(min, max) {
//   return Math.floor(Math.random() * (max - min)) + min;
// }
//
// function compareNumbers(a, b) {
//   return a - b;
// }
//
// const Legend = ({labels, colors}) => (
//     <div className="Legend">
//         { labels.map((label, labelIndex) => {
//             return (
//                 <div>
//                     <span className="Legend--color" style={{ backgroundColor: colors[labelIndex % colors.length]  }} />
//                     <span className="Legend--label">{ label }</span>
//                 </div>
//             );
//         }) }
//     </div>
// );
//
// const ChartsItem = ({classNameMod, style, color, item, itemIndex}) => {
//     classNameMod = classNameMod ? ` ${classNameMod}`: '';
//     return (
//         <div
//             className={`Charts--item${classNameMod}`}
//             style={ style }
//             key={ itemIndex }
//         >
//             <b style={{ color: color }}>{ item }</b>
//         </div>
//     );
// };
//
// let ChartsSerieFunc = (props, additionalClassName) => {
//     return props.data.map((serie, serieIndex) => {
//
//         props.children.props = Object.assign({}, props.children.props, { serie, additionalClassName });
//
//         return (
//             <div className={`Charts--serie${additionalClassName}`}
//                  key={ serieIndex }
//                  style={{height: props.height}}
//             >
//                 <label>{ props.labels[serieIndex] }</label>
//                 {props.children}
//             </div>
//         )
//     })
// };
//
// const ChartsSerie = props => {
//     let additionalClassName = props.additionalClassName ? ` ${props.additionalClassName}` : '';
//
//     return (
//         <div>
//             {ChartsSerieFunc(props, additionalClassName)}
//         </div>
//     )
// };
// //
// // const ChartsSerie = props => {
// //     let additionalClassName = props.additionalClassName ? ` ${props.additionalClassName}` : '';
// //
// //     return (
// //         <div>
// //             {props.data.map((serie, serieIndex) => {
// //
// //                 props.children.props = Object.assign({}, props.children.props, { serie, additionalClassName });
// //
// //                 return (
// //                     <div className={`Charts--serie${additionalClassName}`}
// //                          key={ serieIndex }
// //                          style={{height: props.height}}
// //                     >
// //                         <label>{ props.labels[serieIndex] }</label>
// //                         {props.children}
// //                     </div>
// //                 )
// //             })}
// //         </div>
// //     )
// // };
//
// ChartsSerie.defaultProps = {
//     height: 250
// };
//
// const Charts = props => {
//
//     let additionalClassName = props.additionalClassName ? ` ${props.additionalClassName}` : '';
//
//     return (
//         <div className={`Charts${additionalClassName}`}>
//             {props.children}
//         </div>
//     );
// };
//
// const ChartsItemsFor1 = props => {
//
//     return (
//         <div>
//             {props.serie.map((item, itemIndex) => {
//
//                 let sortedSerie = props.serie.slice(0);
//                 let sum = props.serie.reduce((carry, current) => carry + current, 0);
//                 sortedSerie.sort(compareNumbers);
//
//                 let color = props.colors[props.itemIndex];
//
//                 let size = props.item / (props.max) * 100;
//
//                 let style = {
//                     backgroundColor: color,
//                     opacity: props.item/props.max + .05,
//                     zIndex: props.item,
//                     height: size + '%'
//                 };
//
//                 return (
//                     <ChartsItem
//                         additionalClassName={props.additionalClassName}
//                         style={style}
//                         itemIndex={itemIndex}
//                         color={color}
//                         item={item}
//                     />
//                 )
//             })}
//         </div>
//     )
// };
//
// const ChartsItemsFor2 = props => {
//
//     return (
//         <div>
//             {props.serie.map((item, itemIndex) => {
//
//                 let sortedSerie = props.serie.slice(0);
//                 let sum = props.serie.reduce((carry, current) => carry + current, 0);
//                 sortedSerie.sort(compareNumbers);
//
//                 let color = props.colors[props.itemIndex];
//
//                 let size = props.item / sum * 100;
//
//                 let style = {
//                     backgroundColor: color,
//                     opacity: 1,
//                     zIndex: props.item,
//                     height: size + '%'
//                 };
//
//                 return (
//                     <ChartsItem
//                         additionalClassName={props.additionalClassName}
//                         style={style}
//                         itemIndex={itemIndex}
//                         color={color}
//                         item={item}
//                     />
//                 )
//             })}
//         </div>
//     );
//
// };
//
// const ChartsItemsFor3 = props => {
//
//     return (
//         <div>
//             {props.serie.map((item, itemIndex) => {
//
//                 let sortedSerie = props.serie.slice(0);
//                 sortedSerie.sort(compareNumbers);
//
//                 let color = props.colors[props.itemIndex];
//
//                 let size = props.item / (props.max) * 100;
//
//                 let style = {
//                     backgroundColor: color,
//                     opacity: (props.item/props.max + .05),
//                     zIndex: props.item,
//                     height: size + '%',
//                     right: ((sortedSerie.indexOf(props.item) / (props.serie.length + 1)) * 100) + '%'
//                 };
//
//                 return (
//                     <ChartsItem
//                         additionalClassName={props.additionalClassName}
//                         style={style}
//                         itemIndex={itemIndex}
//                         color={color}
//                         item={item}
//                     />
//                 )
//             })}
//         </div>
//     );
//
// };
//
// const ChartsItemsForHorizontal = props => {
//
//     return (
//         <div>
//             {props.serie.map((item, itemIndex) => {
//
//                 let color = props.colors[itemIndex];
//
//                 let size = item / (props.max) * 100;
//
//                 let style = {
//                     backgroundColor: color,
//                     opacity: (item/props.max + .05),
//                     zIndex: item,
//                     width: size + '%'
//                 };
//
//                 return (
//                     <ChartsItem
//                         additionalClassName={props.additionalClassName}
//                         style={style}
//                         itemIndex={itemIndex}
//                         color={color}
//                         item={item}
//                     />
//                 )
//             })}
//         </div>
//     );
// };
//
// class App extends React.Component {
// 	componentWillMount() {
// 		this.setState({
// 			data: [],
// 			series: ['France', 'Italy', 'England', 'Sweden', 'Germany'],
// 			labels: ['cats', 'dogs', 'horses', 'ducks', 'cows'],
// 			colors: ['#43A19E', '#7B43A1', '#F2317A', '#FF9824', '#58CF6C']
// 		})
// 	}
//
// 	componentDidMount() {
// 		this.populateArray();
// 		setInterval(this.populateArray, 2000);
// 	}
//
// 	populateArray = () => {
// 		const series = 5;
// 		const serieLength = 5;
//
//         let data = new Array(series).fill(new Array(serieLength).fill(0));
//         data = data.map(serie => serie.map(item => getRandomInt(0, 20)));
//
// 		this.setState({ data });
// 	};
//
// 	render() {
// 		const { data, colors, labels, series } = this.state;
// 		const max = data.reduce((max, serie) => Math.max(max, serie.reduce((serieMax, item) => Math.max(serieMax, item), 0)), 0);
//
// 		return (
// 			<section>
//
//                 <Charts>
//                     <ChartsSerie data={data}  labels={labels} >
//                         <ChartsItemsFor1 colors={colors} max={max} />
//                     </ChartsSerie>
//                 </Charts>
//
//                 {/*<Charts>*/}
//                     {/*{data.map((serie, serieIndex) => (*/}
//                         {/*<ChartsSerie serieIndex={serieIndex} labels={labels} >*/}
//                             {/*{serie.map((item, itemIndex) =>  (*/}
//                                 {/*<ChartsItemsFor1 serie={serie} item={item} itemIndex={itemIndex} colors={colors} max={max}>*/}
//                                     {/*<ChartsItem />*/}
//                                 {/*</ChartsItemsFor1>*/}
//                             {/*))}*/}
//                         {/*</ChartsSerie>*/}
//                     {/*))}*/}
//                 {/*</Charts>*/}
//
//                 <Charts>
//                     <ChartsSerie additionalClassName={'stacked'} data={data} labels={labels} >
//                         <ChartsItemsFor2 colors={colors} max={max} />
//                     </ChartsSerie>
//                 </Charts>
//
//                 {/*<Charts>*/}
//                     {/*{data.map((serie, serieIndex) => (*/}
//                         {/*<ChartsSerie additionalClassName={'stacked'} serieIndex={serieIndex} labels={labels} >*/}
//                             {/*{serie.map((item, itemIndex) => (*/}
//                                 {/*<ChartsItemsFor2 serie={serie} item={item} itemIndex={itemIndex} colors={colors} max={max}>*/}
//                                     {/*<ChartsItem />*/}
//                                 {/*</ChartsItemsFor2>*/}
//                             {/*))}*/}
//                         {/*</ChartsSerie>*/}
//                     {/*))}*/}
//                 {/*</Charts>*/}
//
//                 <Charts>
//                     <ChartsSerie additionalClassName={'layered'} data={data} labels={labels} >
//                         <ChartsItemsFor3 colors={colors} max={max} />
//                     </ChartsSerie>
//                 </Charts>
//
//                 {/*<Charts>*/}
//                     {/*{data.map((serie, serieIndex) => (*/}
//                         {/*<ChartsSerie additionalClassName={'layered'} serieIndex={serieIndex} labels={labels} >*/}
//                             {/*{serie.map((item, itemIndex) => (*/}
//                                 {/*<ChartsItemsFor3 serie={serie} item={item} itemIndex={itemIndex} colors={colors} max={max}>*/}
//                                     {/*<ChartsItem />*/}
//                                 {/*</ChartsItemsFor3>*/}
//                             {/*))}*/}
//                         {/*</ChartsSerie>*/}
//                     {/*))}*/}
//                 {/*</Charts>*/}
//
//                 <Charts additionalClassName="horizontal">
//                     <ChartsSerie data={data} labels={series} height={'auto'} >
//                         <ChartsItemsForHorizontal colors={colors} max={max} />
//                     </ChartsSerie>
//                 </Charts>
//
// 				<Legend labels={labels} colors={colors} />
//
// 			</section>
// 		);
// 	}
// }
//
