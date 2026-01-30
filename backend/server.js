require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connectToDB, getDB } = require('./connection');
const contactsRoutes = require('./routes/contacts');

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

connectToDB(process.env.MONGODB_URI).then(() => {
    console.log("Database connected successfully");
}).catch(e => {
    console.error("Failed to connect to the database:", e);
});


// Professional route
app.get('/professional', async (req, res) => {
    // res.send(require('./data.json'));

    try {
        const db = getDB();
        const professionalData = await db.collection('professional').findOne();
        
        if(!professionalData) {
            return res.status(404).send({ message: "No professional data found" });
        }
        res.json(professionalData);
    } catch (e) {
        console.error("Error retrieving professional data:", e);
        res.status(500).json({ message: "Server Error" });
    }
});


// Contacts collection
app.use('/contacts', contactsRoutes);


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/professional`);
});