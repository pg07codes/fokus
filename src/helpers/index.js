export function formattedTimeString(x) {
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

    return `${mins}m ${secs}s`;
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

export function debounce(fn, wait) {
    let t;
    return function () {
        clearTimeout(t);
        t = setTimeout(() => fn.apply(this, arguments), wait);
    };
}
