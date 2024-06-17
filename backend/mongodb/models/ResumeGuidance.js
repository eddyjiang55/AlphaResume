const { connect } = require('../dbconfig');
const { v4: uuidv4 } = require('uuid'); // 引入UUID生成器

class ResumeGuidance {
    constructor(position, guidance, id = null) {
        this._id = id || uuidv4(); // 使用 uuid 生成唯一标识符
        this.position = position; // 应聘职位
        this.guidance = guidance; // 简历标准
    }

    async save() {
        const db = await connect();
        const collection = db.collection('resumeGuidances');
        const result = await collection.insertOne(this);
        return result.insertedId;
    }

    static async findByPosition(position) {
        const db = await connect();
        const collection = db.collection('resumeGuidances');
        return await collection.findOne({ position });
    }
}

module.exports = ResumeGuidance;
