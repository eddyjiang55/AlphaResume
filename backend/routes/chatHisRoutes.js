const express = require('express');
const router = express.Router();
const ChatHistory = require('../mongodb/models/ChatHistory'); // 确保路径与你的项目结构相匹配

// POST /api/chat-history - 创建新的聊天历史记录
router.post('/chat-history', async (req, res) => {
    try {
        const { userAccount, messages, id } = req.body; // 从请求体获取数据
        const chatHistory = new ChatHistory(userAccount, messages, id); // 创建聊天历史实例

        // 调用save方法并从结果中获取insertedId
        const insertedId = await chatHistory.save();

        // 在响应中包含消息和新创建记录的_id
        res.status(201).json({
            message: 'Chat history created successfully',
            _id: insertedId // 包含新创建记录的_id
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Failed to create chat history',
            error: error.toString()
        });
    }
});

router.put('/chat-history/:_id', async (req, res) => {
    const _id = req.params._id;
    const newMessage = req.body; // 前端发送的新消息，包含question和answer

    try {
        const result = await ChatHistory.addMessage(_id, newMessage);
        if (result.matchedCount === 0) {
            return res.status(404).json({ message: "Chat history not found." });
        }
        res.status(200).json({ message: "Message added successfully." });
    } catch (error) {
        console.error("Error adding message:", error);
        res.status(500).json({ message: "Failed to add message.", error: error.toString() });
    }
});

module.exports = router;
