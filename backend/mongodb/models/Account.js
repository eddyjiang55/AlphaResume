const { connect } = require('../dbconfig'); // 确保正确引入数据库配置
const { ObjectId } = require('mongodb');
const { v4: uuidv4 } = require('uuid');

class Account {
    constructor(phoneNumber, nickname, avatar, improvedUsers = [], id = null) {
        this._id = id || uuidv4(); // 生成UUID，如果未提供id
        this.phoneNumber = phoneNumber; 
        this.nickname = nickname;
        this.avatar = avatar;
        this.improvedUsers = improvedUsers;
    }

    async save() {
        const db = await connect();
        const collection = db.collection('accounts');
        // 检查账户是否已存在
        const existingAccount = await collection.findOne({ phoneNumber: this.phoneNumber });
        if (existingAccount) {
            // 如果账户已存在，返回现有的ID
            return existingAccount._id;
        }
        // 否则，插入新账户
        const result = await collection.insertOne(this);
        return result.insertedId;
    }

    static async addImprovedUser(accountId, improvedUserId) {
        const db = await connect();
        const collection = db.collection('accounts');
        const result = await collection.updateOne(
            { _id: accountId }, // 直接使用UUID
            { $push: { improvedUsers: improvedUserId } }
        );
        return result;
    }

    static async deleteImprovedUser(accountId, improvedUserId) {
        const db = await connect();
        const collection = db.collection('accounts');
        const result = await collection.updateOne(
            { _id: accountId }, // 直接使用UUID
            { $pull: { improvedUsers: improvedUserId } }
        );
        return result;
    }

    static async findByPhoneNumber(phoneNumber) {
        const db = await connect();
        const collection = db.collection('accounts');
        return await collection.findOne({ phoneNumber: phoneNumber });
    }

    static async findById(id) {
        const db = await connect();
        const collection = db.collection('accounts');
        const objectid = new ObjectId(id);
        return await collection.findOne({ _id: objectid });
    }
    
    static async create(accountData) {
        const account = new Account(
            accountData.phoneNumber, 
            accountData.nickname, 
            accountData.avatar, 
            accountData.improvedUsers, 
            accountData._id
        );
        return await account.save();
    }
}

module.exports = Account;
