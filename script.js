const days_in_month = {
    31: [1, 3, 5, 7, 8, 10, 12],
    30: [4, 6, 9, 11],
    28: [2]
};

const odd_days_non_leap = {
    1: 3,
    2: 0,
    3: 3,
    4: 2,
    5: 3,
    6: 2,
    7: 3,
    8: 3,
    9: 2,
    10: 3,
    11: 2,
    12: 3
};


const month_names = {
    "january": 1,
    "february": 2,
    "march": 3,
    "april": 4,
    "may": 5,
    "june": 6,
    "july": 7,
    "august": 8,
    "september": 9,
    "october": 10,
    "november": 11,
    "december": 12
};

const index_to_day = {
    0: "Sunday",
    1: "Monday",
    2: "Tuesday",
    3: "Wednesday",
    4: "Thursday",
    5: "Friday",
    6: "Saturday"
};


window.addEventListener("DOMContentLoaded", function () {
    const but = document.getElementsByClassName("Enter")[0];

    but.addEventListener("click", function () {
        let date = parseInt(document.getElementById("date").value);
        let month = document.getElementById("month").value;
        let year = parseInt(document.getElementById("year").value);
        let day;
        let mon = month_names[month.toLowerCase()]

        if ((date > 31 || date < 1) || !mon || (year > 3200 || year < 1600)) {
            alert("Please input the correct values1!!");
        }
        else {

            let isLeap = false;
            if (year % 4 == 0) {
                if (year % 100 == 0) {
                    if (year % 400 == 0) {
                        isLeap = true;
                    }
                } else {
                    isLeap = true;
                }
            }
            //check the dates properly
            let found = false;
            for (let days in days_in_month) {
                if (days_in_month[days].includes(mon)) {
                    if (mon == 2 && isLeap && date > 29) {
                        alert("February has only 29 days in a leap year!");
                        return;
                    } else if (mon == 2 && !isLeap && date > 28) {
                        alert("February has only 28 days in a non-leap year!");
                        return;
                    } else if (date > parseInt(days)) {
                        if (!(mon === 2 && isLeap && date === 29)) {
                            alert(`Month ${month} has only ${days} days!`);
                            return;
                        }
                        found = true;
                        break;
                    }
                }
            }

            //Main calculations:
            let isBase = false
            let base;
            for (let index = year - 1; index >= 1600; index--) {
                if ((index % 400) === 0) {
                    isBase = true;
                    base = index;
                    break;
                }
            }
            
            let remaining_year = year - base;
            let remaining_leap = 0;
            for (let index = year - 1; index > base; index--) {
                if (index % 4 == 0) {
                    if (index % 100 == 0) {
                        if (index % 400 == 0) {
                            remaining_leap += 1;

                        }
                    }
                    else {

                        remaining_leap++;
                    }
                }
            }
            
            if(date == 29 && mon === 2 && isLeap)
            {
                remaining_year -= 1;
            }
            let remaining_non_leap_years = remaining_year - remaining_leap;
            let first_odd_days = (((remaining_non_leap_years * 1) + (remaining_leap * 2)) % 7)
            

            //Now calculation of number of odd days in current year
            let second_odd_days = 0
            if (isLeap) {
                for (let i = 1; i < mon; i++) {
                    second_odd_days += odd_days_non_leap[i]
                }
                ++second_odd_days;
            }
            else {
                for (let i = 1; i < mon; i++) {
                    second_odd_days += odd_days_non_leap[i]
                }
                // second_odd_days += 1;
            }
            second_odd_days %= 7;

            //Now the final step
            total_odd_day = (first_odd_days + second_odd_days + ((date - 1) % 7)) % 7;
            for (let i in index_to_day) {
                if (i == total_odd_day) {
                    day = index_to_day[i];
                }
            }

            const FinalAns = document.getElementsByClassName("FinalAnswer")[0];
            FinalAns.innerHTML = day
        }

    });
});
