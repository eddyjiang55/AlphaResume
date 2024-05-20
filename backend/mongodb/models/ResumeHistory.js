const { connect } = require('../dbconfig');
const { v4: uuidv4 } = require('uuid'); // 引入UUID生成器

class ResumeHistory {
    constructor(account, createdAt, title, position, pdfData, markdownData,id = null) {
        this._id = id || uuidv4();
        this.account = account;
        this.createdAt = createdAt;
        this.pdfData = pdfData; // Storing PDF file data
        this.markdownData = markdownData; // Storing converted Markdown data
        this.title = title;
        this.position = position;
    }

    async save() {
        const db = await connect();
        const collection = db.collection('resumeHistories');
        console.log("connected to db");
        const result = await collection.insertOne(this);
        console.log(result);
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

    static async getPDFData(resumeHistoryId) {
        const db = await connect();
        const collection = db.collection('resumeHistories');
        const resumeHistory = await collection.findOne({ _id: resumeHistoryId });
        await db.client.close(); // 确保在数据被成功获取后关闭数据库连接
        return resumeHistory ? resumeHistory.pdfData : null;
    }
}

module.exports = ResumeHistory;
