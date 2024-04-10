const { connect } = require('../dbconfig');
const { v4: uuidv4 } = require('uuid');

class Skills {
    constructor(account, skills) {
        this._id = uuidv4();
        this.account = account;
        this.skills = skills; // 数组，包含技能名称和熟练度
    }

    async save() {
        const db = await connect();
        const collection = db.collection('skills');
        const result = await collection.insertOne(this);
        return result.insertedId;
    }

    static async findByAccount(account) {
        const db = await connect();
        const collection = db.collection('skills');
        return await collection.find({ account: account }).toArray();
    }
}

module.exports = Skills;
