import { createCronTask,getAllCronTasks} from '@/controllers/cronTaskController';
import generateCron from '@/middlewares/createCronTaskMiddleware'; // Import the generateCron middleware

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            // Apply the generateCron middleware to populate cronExpression and schedule fields
            generateCron(req, res, async () => {
                const cronTask = await createCronTask(req.body);
                res.status(201).json(cronTask);
            });
        } catch (error) {
            console.error('Error creating cron task:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } else if (req.method === 'GET') {
        try {
            // Extract filter from query parameters, if provided
            const filter = req.query.title ? { title: req.query.title } : {};

            const cronTasks = await getAllCronTasks(filter);
            res.status(200).json(cronTasks);
        } catch (error) {
            console.error('Error fetching cron tasks:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } else {
        res.setHeader('Allow', ['POST', 'GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}