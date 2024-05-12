const { connect } = require('../dbconfig'); // 确保正确引入数据库配置
const { ObjectId } = require('mongodb');

class Account {
    constructor(phoneNumber, nickname, avatar, improvedUsers = []) {
        this.phoneNumber = phoneNumber; // 非空验证可以在API层面处理
        this.nickname = nickname;
        this.avatar = avatar;
        this.improvedUsers = improvedUsers; // 存储相关ImprovedUser的ID数组
    }

    async save() {
        const db = await connect();
        const collection = db.collection('accounts');
        const result = await collection.insertOne(this);
        return result.insertedId;
    }

    // static async findById(id) {
    //     const db = await connect();
    //     const collection = db.collection('accounts');
    //     return await collection.findOne({ _id: ObjectId(id) });
    // }

    static async addImprovedUser(accountId, improvedUserId) {
        const db = await connect();
        const collection = db.collection('accounts');
        const result = await collection.updateOne(
            { _id: ObjectId(accountId) },
            { $push: { improvedUsers: improvedUserId } }
        );
        return result;
    }

    static async findByPhoneNumber(phoneNumber) {
        const db = await connect();
        const collection = db.collection('accounts');
        return await collection.findOne({ phoneNumber: phoneNumber });
    }
    
    static async create(accountData) {
        const db = await connect();
        const collection = db.collection('accounts');
        const result = await collection.insertOne(accountData);
        return result.insertedId;
    }
}

module.exports = Account;
