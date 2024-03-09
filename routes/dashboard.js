const express = require("express");
const router = express.Router();
const collection = require("../model/config");
const Contact = require('../model/Contact'); 
const hbs = require('hbs');  
 

router.get("/:id", async (req, resp) => {
    try {
        const userId = req.params.id;
        const user = await collection.findOne({ _id: userId });
        if (!user) {
            return resp.render('dashboard', { message: "User not found", alertClass: "alert-danger" });
        } else {
            const contacts = await Contact.find({ userId });
            return resp.render('dashboard', { user, contacts });
        }
    } catch (error) {
        console.log("An error occurred:", error);
        return resp.render('dashboard', { message: "An error occurred", alertClass: "alert-danger" });
    }    
});

router.post('/:id/addcontact', async (req, res) => {
    try {
        const { name, contact, email, address } = req.body; 
        const userId = req.params.id;  

        const newContact = new Contact({
            name,
            contact,
            email,
            address,
            userId  
        });

        await newContact.save();

        res.redirect(`/dashboard/${userId}`);
    } catch (err) {
        console.error('Error adding contact:', err); 
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.get('/:userId/edit/:contactId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const contactId = req.params.contactId;
        const contact = await Contact.findById(contactId);
        res.render('edit-contact', { contact, userId });
    } catch (err) {
        console.error('Error fetching contact for editing:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.post('/:userId/edit/:contactId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const contactId = req.params.contactId; 
        const { name, contact, email, address } = req.body;
        await Contact.findByIdAndUpdate(contactId, { name, contact, email, address });
        res.redirect(`/dashboard/${userId}`);
    } catch (err) {
        console.error('Error editing contact:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


router.delete('/:userId/delete/:contactId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const contactId = req.params.contactId;

        await Contact.findByIdAndDelete(contactId);

        res.sendStatus(200); 
    } catch (error) {
        console.error('Error deleting contact:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;
