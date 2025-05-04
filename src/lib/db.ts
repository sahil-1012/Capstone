import clientPromise from './mongodb';
const DB_NAME = 'test';

export const getDB = async () => {
    const client = await clientPromise;
    return client.db(DB_NAME);
};