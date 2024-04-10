const { connect } = require('../dbconfig');
const { v4: uuidv4 } = require('uuid');

class EducationExperience {
    constructor(account, educationDetails) {
        this._id = uuidv4();
        this.account = account;
        this.educationDetails = educationDetails; // educationDetails 包含其他所有教育经历的字段
    }

    async save() {
        const db = await connect();
        const collection = db.collection('educationExperiences');
        const result = await collection.insertOne(this);
        return result.insertedId;
    }

    static async findByAccount(account) {
        const db = await connect();
        const collection = db.collection('educationExperiences');
        return await collection.find({ account: account }).toArray();
    }

    // 其他方法...
}
module.exports = EducationExperience;
