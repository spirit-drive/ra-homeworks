let functionsHandlerDate = {

    convertInToDateObj (date) {
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
        let a = this.convertInToDateObj(dateA);
        let b = this.convertInToDateObj(dateB);

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
        return this.aggregationOnData(data, 'month', this.getMount.bind(this));
    },

    handleDataForYear (data) {
        data.sort(this.sortDate.bind(this));
        return this.aggregationOnData(data, 'year', this.getYear.bind(this));
    },

    aggregationOnData(data, newLiteralForData, funcForNewDataLiteral) {
        let newData = [];
        let year;
        let yearInItem;
        let i = -1;

        data.forEach(item => {

            yearInItem = funcForNewDataLiteral(item.date);

            if (year === yearInItem) {
                newData[i].amount += item.amount;
            } else {
                newData.push({[newLiteralForData]: yearInItem, amount: item.amount});
                year = yearInItem;
                ++i;
            }
        });
        return newData;
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