'use strict';

const SectionHead = ({title}) => <h3 className="sectionhead">{title}</h3>;

const ArticleWrap = ({text}) => (
    <div className="articlewrap">
        <div className="article">{text}</div>
    </div>
);

class Section extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            open: !!props.open,
        }
    }

    onClick () {
        this.setState({
            open: !this.state.open,
        })
    }

    getClassName () {
        return this.state.open ? 'section open' : 'section';
    }

    render () {
        return (
            <section className={this.getClassName()} onClick={this.onClick.bind(this)}>
                <button>toggle</button>
                <SectionHead title={this.props.title}/>
                <ArticleWrap text={this.props.text}/>
            </section>
        )
    }
}

let data = [
    {
        open: true,
        title: 'Компоненты',
        text: 'Каждый компонент являются законченной частью пользовательского интерфейса и сам управляет своим состоянием, а композиция компонентов (соединение) позволяет создавать более сложные компоненты. Таким образом, создается иерархия компонентов, причем каждый отдельно взятый компонент независим сам по себе. Такой подход позволяет строить сложные интерфейсы, где есть множество состояний, и взаимодействовать между собой.',
    },
    {
        title: 'Выучил раз, используй везде!',
        text: 'После изучения React вы сможете использовать его концепции не только в браузере, но также и при разработке мобильных приложений с использованием React Native.',
    },
    {
        title: 'Использование JSX',
        text: 'JSX является языком, расширяющим синтаксис стандартного Javascript. По факту он позволяет писать HTML-код в JS-скриптах. Такой подход упрощает разработку компонентов и повышает читаемость кода.',
    },
];

const Main = (props) => {
    return (
        <main className="main">
            <h2 className="title">{props.title}</h2>
            {props.children(props.data)}
        </main>
    )
};

const App = () => {
    return (
        <Main data={data} title="React">
            {data => data.map(item => <Section {...item}/>)}
        </Main>
    )
};

ReactDOM.render(<App />, document.getElementById('accordian'));