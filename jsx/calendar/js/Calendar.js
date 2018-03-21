let Calendar = ({ date }) => {

    const digit = date.getDate();
    const day = date.getDay();
    const month = date.getMonth();
    const year = date.getFullYear();

    let workWithDate = {

        getDaysWeek (numberDay) {
            const dayInWeek = [
                'Воскресенье',
                'Понедельник',
                'Вторник',
                'Среда',
                'Четверг',
                'Пятница',
                'Суббота'
            ];

            return dayInWeek[numberDay]
        },

        getMonthsYear (numberMonth, isInGenitive) {
            const monthInYear = [
                'Январь',
                'Февраль',
                'Март',
                'Апрель',
                'Май',
                'Июнь',
                'Июль',
                'Август',
                'Сентябрь',
                'Октябрь',
                'Ноябрь',
                'Декабрь',
            ];

            const monthInYearInGenitive = [
                'Января',
                'Февраля',
                'Марта',
                'Апреля',
                'Мая',
                'Июня',
                'Июля',
                'Августа',
                'Сентября',
                'Октября',
                'Ноября',
                'Декабря',
            ];

            return isInGenitive ? monthInYearInGenitive[numberMonth] : monthInYear[numberMonth]
        },

        getCountDayInMonth (year, month) {
            return 33 - new Date(year, month, 33).getDate();
        },

        getCountDayBeforeMonth (year, month) {
            return new Date(year, month, 1).getDay() - 1;
        },

        getCountDayAfterMonth (year, month) {

            const countDayInMonth =  this.getCountDayInMonth(year, month);
            const numberDay = new Date(year, month, countDayInMonth).getDay();

            // Если numberDay - воскресенье (0), то нет дней после месяца, потому 0
            return numberDay ? 7 - numberDay : 0;
        },
    };

    let theConstructionTable = {

        createTd (item) {
            if (item[1]) {
                return <td className={item[1]}>{item[0]}</td>;
            } else {
                return <td>{item[0]}</td>;
            }
        },

        createTable (item) {
            return <tr>{item.map(this.createTd)}</tr>;
        },

        createMatrixCalendar (year, month, day) {

            let countDayBeforeMonth = workWithDate.getCountDayBeforeMonth (year, month);
            let totalCountDay = countDayBeforeMonth + workWithDate.getCountDayInMonth (year, month) + workWithDate.getCountDayAfterMonth (year, month);
            let matrixCalendar = [];
            let arrDaysInCalendar = [];
            let currentDate;
            let currentDay;

            // Бежим по всем дням начиная от первого дня в календаре
            for (let i = 0; i < totalCountDay; ++i) {

                /* Получаем нужный день с помощью отрицательного значения
                дней до 1-го числа нужного месяца: -countDayBeforeMonth
                Изменяем день с помощью i
                 */
                currentDate = new Date(year, month, -countDayBeforeMonth + i + 1);
                currentDay = [currentDate.getDate()];

                // Если текущий месяц не равен нашему месяцу, добавляем класс другого месяца
                if (currentDate.getMonth() !== month) {
                    currentDay.push('ui-datepicker-other-month')
                }

                // Если текущая дата - это наш день, добавляем класс нашего дня
                if (currentDate.getDate() === day) {
                    currentDay.push('ui-datepicker-today')
                }

                arrDaysInCalendar.push(currentDay);
            }

            /* Понедельно удаляем из arrDaysInCalendar данные, записывая их в arrResultCalendar,
            до тех пор, пока arrDaysInCalendar не окажется пустым
            */
            while (arrDaysInCalendar.length){
                matrixCalendar.push(arrDaysInCalendar.splice(0, 7));
            }

            return matrixCalendar;

        }
    };

    let matrixCalendar = theConstructionTable.createMatrixCalendar(year, month, digit);

    return (
        <div className="ui-datepicker">

            <div className="ui-datepicker-material-header">
                <div className="ui-datepicker-material-day">{workWithDate.getDaysWeek(day)}</div>
                <div className="ui-datepicker-material-date">
                    <div className="ui-datepicker-material-day-num">{date.getDate()}</div>
                    <div className="ui-datepicker-material-month">{workWithDate.getMonthsYear(month, true)}</div>
                    <div className="ui-datepicker-material-year">{date.getFullYear()}</div>
                </div>
            </div>

            <div className="ui-datepicker-header">
                <div className="ui-datepicker-title">
                    <span className="ui-datepicker-month">{workWithDate.getMonthsYear(month)}</span>&nbsp;<span className="ui-datepicker-year">{date.getFullYear()}</span>
                </div>
            </div>

            <table className="ui-datepicker-calendar">

                <colgroup>
                    <col/>
                    <col/>
                    <col/>
                    <col/>
                    <col/>
                    <col className="ui-datepicker-week-end"/>
                    <col className="ui-datepicker-week-end"/>
                </colgroup>

                <thead>
                    <tr>
                        <th scope="col" title="Понедельник">Пн</th>
                        <th scope="col" title="Вторник">Вт</th>
                        <th scope="col" title="Среда">Ср</th>
                        <th scope="col" title="Четверг">Чт</th>
                        <th scope="col" title="Пятница">Пт</th>
                        <th scope="col" title="Суббота">Сб</th>
                        <th scope="col" title="Воскресенье">Вс</th>
                    </tr>
                </thead>

                <tbody>{matrixCalendar.map(theConstructionTable.createTable, theConstructionTable)}</tbody>

            </table>

        </div>
    );
};