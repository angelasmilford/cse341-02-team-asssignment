const express = require('express');
const router = express.Router();
const { getDB } = require('../connection');
const { ObjectId } = require('mongodb');

// GET all contacts
router.get('/', async (req, res) => {
    try {
        const db = getDB();
        const contacts = await db.collection('contacts').find({}).toArray();

        if (!contacts.length) {
            return res.status(404).json({ message: "No contacts found" });
        }

        res.json(contacts);
    } catch (e) {
        console.error("Error retrieving contacts:", e);
        res.status(500).json({ message: "Server Error" });
    }
});

// GET contact by ID
router.get('/:id', async (req, res) => {
    try {
        const db = getDB();
        const contact = await db.collection('contacts').findOne({ _id: new ObjectId(req.params.id) });

        if (!contact) {
            return res.status(404).json({ message: "Contact not found" });
        }

        res.json(contact);
    } catch (e) {
        console.error("Error retrieving contact by ID:", e);
        res.status(500).json({ message: "Server Error" });
    }
});

module.exports = router;
