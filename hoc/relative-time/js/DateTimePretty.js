'use strict';

function getDateTimeWitUpgrade(Component) {

    return class extends React.Component  {

        constructor (props) {
            super(props);
            if (this.props.date) {
                this.props.date = this.upgradeDate(this.props.date);
            }
        }

        getMessage(unitOfTime, kind) {
            let result;
            let declinationMinutes = ['минут', 'минута', 'минуты'];
            let declinationHours = ['часов', 'час', 'часа'];
            let declinationDays = ['дней', 'день', 'дня'];

            function getLastDigit(digit) {
                let digitToString = digit.toString();
                return parseInt(digitToString[digitToString.length - 1]);
            }

            function getIndexDeclination(lastDigit) {
                return lastDigit === 0 || lastDigit > 4 ?
                    0 :
                    lastDigit === 1 ?
                        1 :
                        2
            }

            function getResultMessage(arrDeclination, unitOfTime) {
                return `${unitOfTime} ${arrDeclination[getIndexDeclination(getLastDigit(unitOfTime))]}`;
            }

            switch (kind) {
                case 'minute':
                    result = getResultMessage(declinationMinutes, unitOfTime);
                    break;

                case 'hour':
                    result = getResultMessage(declinationHours, unitOfTime);
                    break;

                case 'day':
                    result = getResultMessage(declinationDays, unitOfTime);
                    break;
            }

            return result;
        }

        upgradeDate(date) {
            let timePast = (new Date).getTime() - new Date(date);
            let minutePast = ~~(timePast / 1000 / 60);
            let hourPast = ~~(minutePast / 60);
            let dayPast = ~~(hourPast / 24);
            let message;

            if (minutePast < 0) {
                message = 'опубликовано в будующем :)';
            } else if (minutePast < 60) {
                message = `${this.getMessage(minutePast, 'minute')} назад`;
            } else if (hourPast < 24) {
                message = `${this.getMessage(hourPast, 'hour')} назад`;
            } else {
                message = `${this.getMessage(dayPast, 'day')} назад`;
            }
            return message;
        }

        render () {
            return <Component {...this.props} />
        }
    }
}


const DateTimePretty = getDateTimeWitUpgrade(DateTime);