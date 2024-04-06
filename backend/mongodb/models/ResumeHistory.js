const { connect } = require('../dbconfig');
const { v4: uuidv4 } = require('uuid'); // 引入UUID生成器
const { ObjectId } = require('mongodb');

class ResumeHistory {
    constructor(account, createdAt, pdfPath, id = null) {
        // 如果前端提供了id，则使用该id，否则生成一个新的UUID
        this._id = id || uuidv4();
        this.account = account;
        this.createdAt = createdAt;
        this.pdfPath = pdfPath;
    }

    async save() {
        const db = await connect();
        const collection = db.collection('resumeHistories');
        const result = await collection.insertOne({
            account: this.account,
            createdAt: this.createdAt,
            pdfPath: this.pdfPath
        });
        // 只返回insertedId
        return result.insertedId;
    }
  
    // 读取（Find By ID）
    static async findById(id) {
        const db = await connect();
        const collection = db.collection('resumeHistories');
        const resumeHistory = await collection.findOne({ id: id });
        return resumeHistory;
    }

    // 读取（Find By Account）
    static async findByAccount(account) {
        const db = await connect();
        const collection = db.collection('resumeHistories');
        return await collection.find({ account: account }).toArray();
    }
    

    // 读取（Find By Account and CreatedAt）
    static async findByAccountAndCreatedAt(account, createdAt) {
        const db = await connect();
        const collection = db.collection('resumeHistories');
        const resumeHistory = await collection.findOne({ account: account, createdAt: createdAt });
        return resumeHistory;
    }
  
    // 删除（Delete）
    static async deleteById(_id) {
        const db = await connect();
        const collection = db.collection('resumeHistories');
        // 直接使用_id进行删除操作，无需转换为ObjectId
        const result = await collection.deleteOne({ _id: _id });
        return result;
    }
    
    
}

module.exports = ResumeHistory;
