const { connect } = require('../dbconfig'); // 确保路径正确
const { v4: uuidv4 } = require('uuid'); // 引入UUID库
const Account = require('./Account'); // 确保路径正确


class ImprovedUser {
    constructor(personal_data, createdAt, updatedAt, resumeId, page, id = null) {
        this._id = id || uuidv4(); // 如果提供了id，则使用该id；否则，生成一个新的UUID
        this.personal_data = personal_data || {}; // 直接赋值 personal_data
        this.createdAt = createdAt || new Date();
        this.updatedAt = updatedAt || new Date();
        this.resumeId = resumeId || "";
        this.page = page || 0;
    }

    async save(phoneNumber) {
        const db = await connect();
        const collection = db.collection('improvedUsers');
        const result = await collection.insertOne({
            _id: this._id,
            personal_data: this.personal_data,
            resumeId: this.resumeId,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            page: this.page
        });
        
        await Account.addImprovedUser(phoneNumber, this._id);

        return result.insertedId; // 返回插入文档的_id
    }

    static async findById(_id) {
        const db = await connect();
        const collection = db.collection('improvedUsers');
        const resumeRecord = await collection.findOne({ _id });
        return resumeRecord;
    }

    static async getResumeId(_id) {
        const db = await connect();
        const collection = db.collection('improvedUsers');
        const resumeRecord = await collection.findOne({ _id });
        return resumeRecord.resumeId;
    }

    static async update(_id, updateData) {
        const db = await connect();
        const collection = db.collection('improvedUsers');
        const setUpdateData = {};
        for (const key in updateData) {
            setUpdateData[`personal_data.${key}`] = updateData[key];
        }
        setUpdateData.updatedAt = new Date();
        const result = await collection.updateOne({ _id }, { $set: setUpdateData });
        return result;
    }

    static async updatePage(_id, page) {
        const db = await connect();
        const collection = db.collection('improvedUsers');
        const result = await collection.updateOne({ _id }, { $set: { page } });
        return result;
    }

    static async updateResumeId(_id, resumeId) {
        const db = await connect();
        const collection = db.collection('improvedUsers');
        const result = await collection.updateOne({ _id }, { $set: { resumeId } });
        return result;
    }

    static async delete(improvedUserId, phoneNumber) {
        const db = await connect();
        const collection = db.collection('improvedUsers');

        try {
            // 删除 ImprovedUser 记录
            const deleteResult = await collection.deleteOne({ _id: improvedUserId });

            if (deleteResult.deletedCount > 0) {
                // 调用 Account.deleteImprovedUser 方法
                const accountUpdated = await Account.deleteImprovedUser(phoneNumber, improvedUserId);
                return accountUpdated;
            } else {
                return false;
            }
        } catch (error) {
            console.error('Error deleting improved user:', error);
            return false;
        }
    }
}

module.exports = ImprovedUser;
