import { getCronTaskById, updateCronTaskById, deleteCronTaskById } from '@/controllers/cronTaskController';
import { ObjectId } from 'mongodb'
import generateCron from '@/middlewares/createCronTaskMiddleware';

export default async function handler(req, res) {
    const { method, query } = req;
    const { id } = query;

    switch (method) {
        case 'GET':
            await getCronTaskByIdHandler(id, res);
            break;
        case 'PUT':
            // await updateCronTaskByIdHandler(id, req, res);
            try {
                // Apply the generateCron middleware to populate cronExpression and schedule fields
                generateCron(req, res, async () => {
                    const updatedCronTask = await updateCronTaskByIdHandler(id, req,res);
                    if (!updatedCronTask) {
                        res.status(404).end();
                        return;
                    }
                    res.status(200).json(updatedCronTask);
                });
            } catch (error) {
                console.error('Error updating cron task:', error);
                res.status(400).json({ error: 'Bad Request' });
            }
            break;
        case 'DELETE':
            await deleteCronTaskByIdHandler(id, res);
            break;
        default:
            res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}

async function getCronTaskByIdHandler(id, res) {
    try {
        const cronTask = await getCronTaskById(id);
        if (!cronTask) {
            res.status(404).end();
            return;
        }
        res.status(200).json(cronTask);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function updateCronTaskByIdHandler(id, req, res) {
    try {
        const newData = req.body;
        const Id =new ObjectId(id);
        const updatedCronTask = await updateCronTaskById(Id, newData);
        if (!updatedCronTask) {
            res.status(404).end();
            return;
        }
        res.status(200).json(updatedCronTask);
    } catch (error) {
        res.status(400).json({ error: 'Bad Request' });
    }
}

async function deleteCronTaskByIdHandler(id, res) {
    try {
        const Id =new ObjectId(id);
        const deletedCronTask = await deleteCronTaskById(Id);
        if (!deletedCronTask) {
            res.status(404).end();
            return;
        }
        res.status(200).json(deletedCronTask);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
