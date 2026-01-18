const { MongoClient } = require('mongodb');

let dbConnection;

async function connectToDB(uri) {
    try {
        const client = new MongoClient(uri, {
            tls: true, // force TLS
        });
        
        await client.connect();
        console.log("Connected to MongoDB");
        dbConnection = client.db(); 
        return dbConnection;
    } catch (e) {
        console.error("MongoDB connection error:", e);
        throw e;
    }
}

function getDB() {
    if (!dbConnection) {
        throw new Error("Database not connected!");
    }
    return dbConnection;
}

module.exports = { connectToDB, getDB };
