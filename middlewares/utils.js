
function generateCronExpression(frequency, repeat, time) {
    let cronExpression = '';

    // Parse the time into hours and minutes
    const [hours, minutes] = time.split(':');

    switch (frequency) {
        case 'Monthly':
            // For Monthly frequency, check the repeat option
            if (repeat === 'firstMonday') {
                cronExpression = `${minutes} ${hours} 1-7 * 1`; // First Monday of the month
            } else if (repeat === 'lastFriday') {
                cronExpression = `${minutes} ${hours} 24-31 * 5`; // Last Friday of the month
            }
            break;

        case 'Weekly':
            // For Weekly frequency, generate cron expression for selected weekdays
            const selectedWeekdays = repeat.split(',')?.map(day => day.trim());
            const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
            const weekdayIndices = selectedWeekdays?.map(day => daysOfWeek.indexOf(day));
            const weekdayCron = weekdayIndices.join(',');
            cronExpression = `${minutes} ${hours} * * ${weekdayCron}`; // Run every selected weekday at the specified time
            break;

        case 'Daily':
            // For Daily frequency, no repeat needed, cron expression for every day
            cronExpression = `${minutes} ${hours} * * *`; // Run daily at the specified time
            break;

        default:
            // Handle invalid frequency
            throw new Error('Invalid frequency');
    }

    return cronExpression;
}




function generateCronString(frequency, repeat, time) {
    let scheduleString = `At ${time}`;

    switch (frequency) {
        case 'Monthly':
            if (repeat === 'firstMonday') {
                scheduleString += ' on the first Monday of the month';
            } else if (repeat === 'lastFriday') {
                scheduleString += ' on every day-of-month from 24 through 31 and on Friday';
            }
            break;

        case 'Weekly':
            scheduleString += ` on ${repeat}`;
            break;

        case 'Daily':
            scheduleString += ' every day';
            break;

        default:
            throw new Error('Invalid frequency');
    }

    return scheduleString;
}


module.exports={
    generateCronExpression,
    generateCronString
}