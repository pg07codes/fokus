export function formattedTimeString(x) {
    x = Math.floor(x / 1000);
    let secs = x % 60;
    let mins = Math.floor(x / 60);

    if (secs == 0) {
        secs = `00`;
    } else if (secs < 10) {
        secs = `0${secs}`;
    }
    if (mins == 0) {
        mins = `00`;
    } else if (mins < 10) {
        mins = `0${mins}`;
    }

    return `${mins}:${secs}`;
}

export function formattedTimeStringv2(x) {
    x = Math.floor(x / 1000);
    let secs = x % 60;
    let mins = Math.floor(x / 60);

    if (secs == 0) {
        secs = `00`;
    } else if (secs < 10) {
        secs = `0${secs}`;
    }
    if (mins == 0) {
        mins = `00`;
    } else if (mins < 10) {
        mins = `0${mins}`;
    }

    return { mins, secs };
}

export function getFormattedDate() {
    let d = new Date();
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return {
        day: days[d.getDay()],
        month: months[d.getMonth()],
        date: d.getDate(),
        year: d.getFullYear(),
    };
}

export function getFormattedListTimeSummary(x) {
    x = Math.floor(x / 1000);
    let mins = Math.floor((x % 3600) / 60);
    let hours = Math.floor(x / 3600);

    if (mins == 0) {
        mins = `00`;
    } else if (mins < 10) {
        mins = `0${mins}`;
    }
    if (hours == 0) {
        hours = `0`;
    } else if (hours < 10) {
        hours = `${hours}`;
    }

    return { hours, mins };
}

export function debounce(fn, wait) {
    let t;
    return function () {
        clearTimeout(t);
        t = setTimeout(() => fn.apply(this, arguments), wait);
    };
}

export function updatePageTitle(title) {
    document.title = title;
}

export function getOrdinalSuffix(i) {
    let j = i % 10,
        k = i % 100;
    if (j == 1 && k != 11) {
        return "st";
    }
    if (j == 2 && k != 12) {
        return "nd";
    }
    if (j == 3 && k != 13) {
        return "rd";
    }
    return "th";
}

const MILLI_IN_30_DAYS = 2592000000;
const MILLI_IN_A_DAY = 86400000;
const MILLI_IN_A_HOUR = 3600000;
const MILLI_IN_A_MIN = 60000;

export function getTimeDifferenceForNotes(d1, d2) {
    let difference = d2 - d1;

    if (difference < MILLI_IN_A_HOUR) {
        let minsGap = Math.floor(difference / MILLI_IN_A_MIN);
        return minsGap === 0 ? `recently` : `${minsGap}mins ago`;
    } else if (difference < MILLI_IN_A_DAY) {
        let hoursGap = Math.floor(difference / MILLI_IN_A_HOUR);
        if (hoursGap <= 1) return `${hoursGap}hr ago`;
        else return `${hoursGap}hrs ago`;
    } else if (difference < MILLI_IN_30_DAYS) {
        let daysGap = Math.floor(difference / MILLI_IN_A_DAY);
        if (daysGap <= 1) return `${daysGap}day ago`;
        else return `${daysGap}days ago`;
    } else {
        return `30+days ago`;
    }
}
