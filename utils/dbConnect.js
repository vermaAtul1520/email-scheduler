import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;

if (!uri) {
    throw new Error('MongoDB URI not found in environment variables');
}

const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

let cachedDb = null;

export async function connectToDatabase() {
    if (cachedDb) {
        return cachedDb;
    }

    try {
        await client.connect();
        const db = client.db();
        cachedDb = db;
        console.log("successfully connected..")
        return db;
    } catch (error) {
        throw new Error('Failed to connect to MongoDB: ' + error);
    }
}

export default client;
