const { connect } = require('../dbconfig');
const { ObjectId } = require('mongodb');

class VerificationCode {
    constructor(phoneNumber, code, expiresAt) {
        this.phoneNumber = phoneNumber;
        this.code = code;
        this.expiresAt = expiresAt;
    }

    async save() {
        const db = await connect();
        const collection = db.collection('verificationCodes');
        // 删除旧的验证码
        await collection.deleteOne({ phoneNumber: this.phoneNumber });
        // 保存新的验证码
        const result = await collection.insertOne(this);
        return result.insertedId;
    }

    static async findValidCode(phoneNumber, code) {
        const db = await connect();
        const collection = db.collection('verificationCodes');
        const current = new Date();
        const verificationCode = await collection.findOne({
            phoneNumber: phoneNumber,
            code: code,
            expiresAt: { $gte: current }
        });

        return verificationCode;
    }

    static async cleanExpiredCodes() {
        const db = await connect();
        const collection = db.collection('verificationCodes');
        const result = await collection.deleteMany({ 
            expiresAt: { $lt: new Date() }
        });
        return result.deletedCount;
    }

    static async deleteOne(query) {
        const db = await connect();
        const collection = db.collection('verificationCodes');
        const result = await collection.deleteOne(query);
        return result.deletedCount;  // 返回删除的记录数
    }
}

module.exports = VerificationCode;
