'use strict';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selected: 'All'
        }
    }

    filterProjects = (arrProjects) => {

        let filteredArray = arrProjects.filter(project => project.category === this.state.selected);

        return this.state.selected === 'All' ? arrProjects : filteredArray;
    };

    render() {
        return (
            <div>
                <Toolbar
                    filters={this.props.filters}
                    selected={this.state.selected}
                    onSelectFilter={(filter) => this.setState({selected: filter})} />
                <Portfolio projects={this.filterProjects(this.props.projects)} />
            </div>
        )
    }
}