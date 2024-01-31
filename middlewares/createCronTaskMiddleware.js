import { generateCronExpression, generateCronString } from '@/middlewares/utils';

function generateCron(req, res, next) {
    const { frequency, repeat, time } = req.body; // Assuming the request body contains frequency, repeat, and time
    const cronExpression = generateCronExpression(frequency, repeat, time);
    const scheduleString = generateCronString(frequency, repeat, time);
    req.body.cronExpression = cronExpression;
    req.body.schedule = scheduleString;
    req.body
    next();
}

module.exports = generateCron;