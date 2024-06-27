const { connect } = require('../dbconfig'); // 确保路径正确
const { v4: uuidv4 } = require('uuid'); // 引入UUID库

class ImprovedUser {
    constructor(基本信息, 个人评价, 教育经历, 职业经历, 项目经历, 获奖与证书, 语言, 技能, 科研论文与知识产权, id = null) {
        this._id = id || uuidv4(); // 如果提供了id，则使用该id；否则，生成一个新的UUID
        this.personal_data = {
            基本信息: 基本信息,
            个人评价: 个人评价,
            教育经历: 教育经历,
            职业经历: 职业经历,
            项目经历: 项目经历,
            获奖与证书: 获奖与证书,
            语言: 语言,
            技能: 技能,
            科研论文与知识产权: 科研论文与知识产权
        };
        this.createdAt = new Date();
        this.updatedAt = new Date();
        this.resumeId = "";
        this.complteness = 0;
    }

    async save() {
        const db = await connect();
        const collection = db.collection('improvedUsers'); // 修改集合名称为'improvedUsers'
        const result = await collection.insertOne({
            _id: this._id,
            personal_data: this.personal_data,
            resumeId: this.resumeId,
            complteness: this.complteness,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        });
        return result.insertedId; // 返回插入文档的_id
    }

    static async findById(_id) {
        const db = await connect();
        const collection = db.collection('improvedUsers'); // 使用新的集合名称'improvedUser'
        const resumeRecord = await collection.findOne({ _id });
        return resumeRecord;
    }

    static async getResumeId(_id) {
        const db = await connect();
        const collection = db.collection('improvedUsers'); // 使用新的集合名称'improvedUser'
        const resumeRecord = await collection.findOne({ _id });
        return resumeRecord.resumeId;
    }

    static async update(_id, updateData) {
        const db = await connect();
        const collection = db.collection('improvedUsers'); // 使用新的集合名称'improvedUser'
        const setUpdateData = {};
        for (const key in updateData) {
            setUpdateData[`personal_data.${key}`] = updateData[key];
        }
        setUpdateData.updatedAt = new Date();
        console.log("before update to db");
        console.log(setUpdateData);
        const result = await collection.updateOne({ _id }, { $set: setUpdateData });
        return result;
    }

    static async deleteById(_id) {
        const db = await connect();
        const collection = db.collection('improvedUsers'); // 使用新的集合名称'improvedUser'
        const result = await collection.deleteOne({ _id });
        return result;
    }
}

module.exports = ImprovedUser;
