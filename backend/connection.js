const { MongoClient } = require('mongodb');

let dbConnection;

async function connectToDB(uri) {
    try {
        const client = new MongoClient(uri); 
        await client.connect();
        console.log("Connected to MongoDB");
        dbConnection = client.db('professional'); 
        return dbConnection;
    } catch (e) {
        console.error("MongoDB connection error:", e);
    }
}

function getDB() {
    if (!dbConnection) {
        throw new Error("Database not connected!");
    }
    return dbConnection;
}

module.exports = { connectToDB, getDB };
