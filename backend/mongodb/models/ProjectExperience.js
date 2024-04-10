const { connect } = require('../dbconfig');
const { v4: uuidv4 } = require('uuid');

class ProjectExperience {
    constructor(account, projects) {
        this._id = uuidv4();
        this.account = account;
        this.projects = projects; // 包含项目的数组，每个项目对象包含项目名称、城市、国家、起止时间、项目角色、项目链接、项目成就等信息
    }

    async save() {
        const db = await connect();
        const collection = db.collection('projectExperiences');
        const result = await collection.insertOne(this);
        return result.insertedId;
    }

    static async findByAccount(account) {
        const db = await connect();
        const collection = db.collection('projectExperiences');
        return await collection.find({ account: account }).toArray();
    }
}

module.exports = ProjectExperience;
