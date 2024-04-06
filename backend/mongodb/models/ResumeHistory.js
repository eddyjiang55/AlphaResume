const { connect } = require('../dbconfig');
const { v4: uuidv4 } = require('uuid'); // 引入UUID生成器

class ResumeHistory {
    constructor(account, createdAt, pdfPath, title, position, id = null) {
        // 如果前端提供了id，则使用该id，否则生成一个新的UUID
        this._id = id || uuidv4();
        this.account = account;
        this.createdAt = createdAt;
        this.pdfPath = pdfPath;
        this.title = title; // 新增属性：标题
        this.position = position; // 新增属性：岗位
    }

    async save() {
        const db = await connect();
        const collection = db.collection('resumeHistories');
        const result = await collection.insertOne({
            account: this.account,
            createdAt: this.createdAt,
            pdfPath: this.pdfPath,
            title: this.title, // 保存标题
            position: this.position // 保存岗位
        });
        // 只返回insertedId
        return result.insertedId;
    }
  
    // 读取（Find By ID）
    static async findById(id) {
        const db = await connect();
        const collection = db.collection('resumeHistories');
        const resumeHistory = await collection.findOne({ _id: id });
        return resumeHistory;
    }

    // 读取（Find By Account）
    static async findByAccount(account) {
        const db = await connect();
        const collection = db.collection('resumeHistories');
        return await collection.find({ account: account }).toArray();
    }

    // 新增方法：根据账号和岗位查找简历
    static async findByAccountAndPosition(account, position) {
        const db = await connect();
        const collection = db.collection('resumeHistories');
        const resumes = await collection.find({ account: account, position: position }).toArray();
        return resumes;
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
