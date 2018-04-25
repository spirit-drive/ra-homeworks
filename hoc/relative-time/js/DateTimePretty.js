'use strict';

function getDateTimeWitUpgrade(Component) {

    return function (props) {

        function getMessage(unitOfTime, kind) {
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

        function upgradeDate(date) {
            let timePast = (new Date).getTime() - new Date(date);
            let minutePast = ~~(timePast / 1000 / 60);
            let hourPast = ~~(minutePast / 60);
            let dayPast = ~~(hourPast / 24);
            let message;

            if (minutePast < 0) {
                message = 'опубликовано в будующем :)';
            } else if (minutePast < 60) {
                message = `${getMessage(minutePast, 'minute')} назад`;
            } else if (hourPast < 24) {
                message = `${getMessage(hourPast, 'hour')} назад`;
            } else {
                message = `${getMessage(dayPast, 'day')} назад`;
            }
            return message;
        }

        if (props.date) {
            props.date = upgradeDate(props.date);
        }

        return Component.call(this, props)
    }
}


const DateTimePretty = getDateTimeWitUpgrade(DateTime);