// models/cronTask.js
import mongoose from 'mongoose';

const cronTaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    subject: String,
    schedule: {
        type: String,
        required: true,
    },
    cronExpression: {
        type: String,
        required: true,
    },
});

export default mongoose.models.CronTask || mongoose.model('CronTask', cronTaskSchema);
