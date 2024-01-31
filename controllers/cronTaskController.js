

import { ObjectId } from 'mongodb'
import { connectToDatabase } from '../utils/dbConnect';

export async function createCronTask(data) {
    const db = await connectToDatabase();
    const cronTasks = db.collection('crontasks');
    const result = await cronTasks.insertOne(data);
    return result;
}

export async function getAllCronTasks(filter = {}) {
    const db = await connectToDatabase();
    const cronTasks = db.collection('crontasks');
    const partialMatchFilter = filter.title ? { title: { $regex: filter.title, $options: 'i' } } : {};
    return cronTasks.find(partialMatchFilter).toArray();
}



export async function getCronTaskById(id) {
    const db = await connectToDatabase();
    const cronTasks = db.collection('crontasks');
    const objectId = new ObjectId(id);
    return await cronTasks.findOne({ _id: objectId });
}

export async function updateCronTaskById(id, newData) {
    const db = await connectToDatabase();
    const cronTasks = db.collection('crontasks');
    return await cronTasks.findOneAndUpdate(
        { _id: id },
        { $set: newData },
        {  returnDocument: 'after' }
    );
}

export async function deleteCronTaskById(id) {
    const db = await connectToDatabase();
    const cronTasks = db.collection('crontasks');
    return cronTasks.findOneAndDelete({ _id: id });
}