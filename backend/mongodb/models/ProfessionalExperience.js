const { connect } = require('../dbconfig');
const { v4: uuidv4 } = require('uuid');

class ProfessionalExperience {
    constructor(account, experienceDetails) {
        this._id = uuidv4();
        this.account = account;
        this.experienceDetails = experienceDetails; // 包含公司名称、城市、国家、起止时间、职位、部门、职责描述等信息的对象
    }

    async save() {
        const db = await connect();
        const collection = db.collection('professionalExperiences');
        const result = await collection.insertOne(this);
        return result.insertedId;
    }

    static async findByAccount(account) {
        const db = await connect();
        const collection = db.collection('professionalExperiences');
        return await collection.find({ account: account }).toArray();
    }
}

module.exports = ProfessionalExperience;
