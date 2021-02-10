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

