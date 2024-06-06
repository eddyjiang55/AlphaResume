const { connect } = require('../dbconfig');
const { v4: uuidv4 } = require('uuid'); // 引入UUID生成器

class ResumeChat {
    constructor(userAccount, messages, resumeId,  id = null) {
        this._id = id || uuidv4(); // 使用 uuid 生成唯一标识符
        this.userAccount = userAccount;
        this.messages = messages; // 假设 messages 为一问一答数组
        this.resumeId = resumeId
    }

    async save() {
        const db = await connect();
        const collection = db.collection('resumeChats');
        const result = await collection.insertOne(this);
        return result.insertedId;
    }

    static async addMessage(_id, newMessage) {
        const db = await connect();
        const collection = db.collection('resumeChats');
        return await collection.updateOne(
            { _id },
            { $push: { messages: newMessage } }
        );
    }

    // static async addQuestion(_id, newQuestion) {
    //     const db = await connect();
    //     const collection = db.collection('resumeChats');
    //     return await collection.updateOne(
    //         { _id },
    //         { $push: { messages: { question: newQuestion, answer: "" } } }
    //     );
    // }

    static async addAnswer(_id, messageId, newAnswer) {
        const db = await connect();
        const collection = db.collection('resumeChats');
        const document = await collection.findOne({ _id });
        console.log(messageId)
        console.log(newAnswer)
        console.log(document.messages)
        const messageIndex = document.messages.findIndex(message => message.id === messageId);
        console.log(messageIndex)

        return await collection.updateOne(
            { _id },
            { $set: { [`messages.${messageIndex}.answer`]: newAnswer } }
        );
    }

    static async findByUserAccount(userAccount) {
        const db = await connect();
        const collection = db.collection('resumeChats');
        return await collection.find({ userAccount }).toArray();
    }

    static async findById(_id) {
        const db = await connect();
        const collection = db.collection('resumeChats');
        return await collection.findOne({ _id });
    }

    static async deleteById(_id) {
        const db = await connect();
        const collection = db.collection('resumeChats');
        return await collection.deleteOne({ _id });
    }
}

module.exports = ResumeChat;
