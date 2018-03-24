'use strict';

const Calendar = ({date}) => {
    return (
        <div className="ui-datepicker">
            <MainHeader date={date} />
            <BottomHeader date={date} />
            <Table matrixCalendar={helper.createMatrixCalendar(date)} />
        </div>
    );
};

const MainHeader = ({date}) => {
    return (
        <div className="ui-datepicker-material-header">
            <div className="ui-datepicker-material-day">{helper.getDaysWeek(date)}</div>
            <div className="ui-datepicker-material-date">
                <div className="ui-datepicker-material-day-num">{date.getDate()}</div>
                <div className="ui-datepicker-material-month">{helper.getMonthsYear(date, true)}</div>
                <div className="ui-datepicker-material-year">{date.getFullYear()}</div>
            </div>
        </div>
    );
};

const BottomHeader = ({date}) => {
    return (
        <div className="ui-datepicker-header">
            <div className="ui-datepicker-title">
                <span className="ui-datepicker-month">{helper.getMonthsYear(date)}</span>&nbsp;<span className="ui-datepicker-year">{date.getFullYear()}</span>
            </div>
        </div>
    );
};

const Table = ({matrixCalendar}) => {
    return (
        <table className="ui-datepicker-calendar">
            <Colgroup />
            <Thead />
            <tbody>{matrixCalendar.map(item => <Tr matrixWeek={item} />)}</tbody>
        </table>
    )
};

const Colgroup = () => {
    return (
        <colgroup>
            <col/>
            <col/>
            <col/>
            <col/>
            <col/>
            <col className="ui-datepicker-week-end"/>
            <col className="ui-datepicker-week-end"/>
        </colgroup>
    )
};

const Thead = () => {
    return (
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
    )
};

const Tr = ({matrixWeek}) => <tr>{matrixWeek.map(item => <Td cell={item} />)}</tr>;

const Td = ({cell}) => <td className={cell.className || null}>{cell.date}</td>;

let helper = {

    getDaysWeek(date) {
        const dayInWeek = [
            'Воскресенье',
            'Понедельник',
            'Вторник',
            'Среда',
            'Четверг',
            'Пятница',
            'Суббота'
        ];

        return dayInWeek[date.getDay()]
    },

    getMonthsYear(date, inGenitive) {
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

        return inGenitive ? monthInYearInGenitive[date.getMonth()] : monthInYear[date.getMonth()]
    },

    getCountDayInMonth: (year, month) => 33 - new Date(year, month, 33).getDate(),

    getCountDayBeforeMonth(year, month) {
        const firstDay = new Date(year, month, 1).getDay();

        // Если firstDay - воскресенье (0), то перед месяцем 6 дней
        return firstDay ? firstDay - 1 : 6;
    },

    getCountDayAfterMonth(year, month) {

        const countDayInMonth =  this.getCountDayInMonth(year, month);
        const lastDay = new Date(year, month, countDayInMonth).getDay();

        // Если lastDay - воскресенье (0), то нет дней после месяца, потому 0
        return lastDay ? 7 - lastDay : 0;
    },

    createMatrixCalendar(date) {

        const day = date.getDate();
        const month = date.getMonth();
        const year = date.getFullYear();

        const countDayBefore = this.getCountDayBeforeMonth(year, month);
        const countDayInMonth = this.getCountDayInMonth(year, month);
        const countDayAfter = this.getCountDayAfterMonth(year, month);

        const totalCountDay = countDayBefore + countDayInMonth + countDayAfter;

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
            currentDate = new Date(year, month, -countDayBefore + i + 1);
            currentDay = {
                date: currentDate.getDate()
            };

            // Если текущий месяц не равен нашему месяцу, добавляем класс другого месяца
            if (currentDate.getMonth() !== month) {
                currentDay.className = 'ui-datepicker-other-month';
            }

            // Если текущая дата - это наш день, добавляем класс нашего дня
            if (currentDate.getDate() === day) {
                currentDay.className = 'ui-datepicker-today';
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
