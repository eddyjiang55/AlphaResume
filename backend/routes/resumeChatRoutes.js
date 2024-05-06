const express = require('express');
const router = express.Router();
const ResumeChat = require('../mongodb/models/ResumeChat');

router.post('/resume-chat', async (req, res) => {
    try {
        const { userAccount, messages } = req.body;
        const resumeChat = new ResumeChat(userAccount, messages);
        const _id = await resumeChat.save();
        res.status(201).json({ message: 'Resume chat created successfully', _id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to create resume chat', error: error.toString() });
    }
});

router.put('/resume-chat/:_id', async (req, res) => {
    try {
        const _id = req.params._id;
        const newMessage = req.body; // Assume the new message is sent in the request body
        await ResumeChat.addMessage(_id, newMessage);
        res.status(200).json({ message: "Message added successfully." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to add message.", error: error.toString() });
    }
});

router.get('/resume-chat/user-account/:userAccount', async (req, res) => {
    try {
        const userAccount = req.params.userAccount;
        const chats = await ResumeChat.findByUserAccount(userAccount);
        res.status(200).json(chats);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to retrieve chats.", error: error.toString() });
    }
});

router.delete('/resume-chat/:_id', async (req, res) => {
    try {
        const _id = req.params._id;
        await ResumeChat.deleteById(_id);
        res.json({ message: 'Chat deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to delete chat', error: error.toString() });
    }
});

module.exports = router;
