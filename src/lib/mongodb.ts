import { MongoClient } from 'mongodb';

if (!process.env.MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable in .env.local');
}

const uri = process.env.MONGODB_URI;
const options = {};

let client;
let clientPromise;

// In development mode, use a global variable to preserve the connection
// across hot-reloads
if (process.env.NODE_ENV === 'development') {
    // Create a global variable to hold the promise
    const globalWithMongo = global as typeof globalThis & { _mongoClientPromise?: Promise<MongoClient>; };

    if (!globalWithMongo._mongoClientPromise) {
        client = new MongoClient(uri, options);
        globalWithMongo._mongoClientPromise = client.connect();
    }
    clientPromise = globalWithMongo._mongoClientPromise;
} else {
    // In production mode, create a new client for each connection
    client = new MongoClient(uri, options);
    clientPromise = client.connect();
}

// Export the promise so it can be imported by other files
export default clientPromise as Promise<MongoClient>;