let functionsHandlerDate = {

    convertDate (date) {
        return new Date(date.date);
    },

    convertDateInToMonth (date) {
        return new Date(date.date).getMonth();
    },

    sort (a, b) {
        return a < b ?
            -1 :
            a > b ?
                1 :
                0;
    },

    sortDate(dateA, dateB) {
        let a = this.convertDate(dateA);
        let b = this.convertDate(dateB);

        return this.sort(a, b);
    },

    sortDateForMonth (dateA, dateB) {
        let a = this.convertDateInToMonth(dateA);
        let b = this.convertDateInToMonth(dateB);

        return this.sort(a, b);
    },

    getMount (date) {
        return new Date(date).toDateString().split(' ')[1];
    },

    getYear (date) {
        return new Date(date).getFullYear();
    },

    handleDataForMonth (data) {
        data.sort(this.sortDateForMonth.bind(this));
        return data.map(item => {return {month: this.getMount(item.date), amount: item.amount}});
    },

    handleDataForYear (data) {
        data.sort(this.sortDate.bind(this));
        return data.map(item => {return {year: this.getYear(item.date), amount: item.amount}});
    },


    forSortTable(props) {
        return props.list.sort(this.sortDate.bind(this));
    },

    forMonthTable(props) {
        return this.handleDataForMonth(props.list);
    },

    forYearTable(props) {
        return this.handleDataForYear(props.list);
    },

};