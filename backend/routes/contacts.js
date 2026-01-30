const express = require('express');
const router = express.Router();
const { getDB } = require('../connection');
const { ObjectId } = require('mongodb');

// GET all contacts
router.get('/', async (req, res) => {
    try {
        const db = getDB();
        const contacts = await db.collection('contacts').find({}).toArray();

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
        const contact = await db.collection('contacts').findOne({ 
            _id: new ObjectId(req.params.id) 
        });

        if (!contact) {
            return res.status(404).json({ message: "Contact not found" });
        }

        res.json(contact);
    } catch (e) {
        console.error("Error retrieving contact by ID:", e);
        res.status(500).json({ message: "Server Error" });
    }
});

// POST contact
router.post('/', async (req, res) => {
    try{
        const db = getDB();
        const result = await db.collection('contacts').insertOne(req.body);
        
        res.status(201).json({
            id: result.insertedId,
            message: 'Contact created successfully'
        });
    } catch (e) {
        res.status(500).json({ message: 'Failed to create new contact' });
    }
});

// PUT contact
router.put('/:id', async(req, res) => {
    try {
        const db = getDB();

        const result = await db.collection('contacts').updateOne(
            { _id: new ObjectId(req.params.id) },
            { $set: req.body }
        );

        if(result.matchedCount === 0) {
            return res.status(404).json({ message: 'Contact not found' });
        }

        res.status(204).json();
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: 'Failed to update contact' });
    }
});

// DELETE contact
router.delete('/:id', async (req, res) => {
    try {
        const db = getDB();
        const result = await db.collection('contacts').deleteOne({
            _id: new ObjectId(req.params.id)
        });

        if(result.deletedCount === 0) {
            return res.status(404).json({ message: 'Contact not found' });
        }

        res.status(200).json({ message: 'Contact deleted successfully' });
    } catch (e) {
        res.status(500).json({ message: 'Failed to delete contact' })
    }
});

module.exports = router;
