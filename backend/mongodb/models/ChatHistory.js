const { connect } = require('../dbconfig');
const { v4: uuidv4 } = require('uuid'); // 引入UUID生成器
const { ObjectId } = require('mongodb');


class ChatHistory {
    constructor(userAccount, messages,id=null) {
        this._id = id ? new ObjectId(id) : uuidv4();
        this.userAccount = userAccount;
        this.timestamp = new Date(); // 设置当前时间为对话创建的时间戳
        this.messages = messages;
    }

    // 保存当前实例到数据库
    async save() {
        const db = await connect();
        const collection = db.collection('resumeHistories');
        // 插入文档
        const result = await collection.insertOne({
            account: this.account,
            createdAt: this.createdAt,
            pdfPath: this.pdfPath
        });
        // 返回新插入文档的_id
        return result.insertedId;
    }
    

    // 通过id添加聊天记录
    static async addMessage(_id, newMessage) {
        const db = await connect();
        const collection = db.collection('chatHistories');
        return await collection.updateOne(
            { _id }, // 直接使用_id，不转换为ObjectId
            { $push: { messages: newMessage } }
        );
    }

    // 根据ID查找聊天记录
    static async findById(_id) {
        const db = await connect();
        const collection = db.collection('chatHistories');
        const chatHistory = await collection.findOne({ _id: new ObjectId(_id) });
        return chatHistory;
    }

    // 根据用户账号查找聊天记录
    static async findByUserAccount(userAccount) {
        const db = await connect();
        const collection = db.collection('chatHistories');
        const chatHistories = await collection.find({ userAccount: userAccount }).toArray();
        return chatHistories;
    }

    // 删除指定ID的聊天记录
    static async deleteById(_id) {
        const db = await connect();
        const collection = db.collection('chatHistories');
        const result = await collection.deleteOne({ _id: new ObjectId(_id) });
        return result;
    }

    // 更新聊天记录，例如添加新的消息
    static async updateById(_id, newMessages) {
        const db = await connect();
        const collection = db.collection('chatHistories');
        const result = await collection.updateOne(
            { _id: new ObjectId(_id) },
            { $set: { messages: newMessages } }
        );
        return result;
    }
}

module.exports = ChatHistory;
