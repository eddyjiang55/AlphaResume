const { connect } = require('../dbconfig');
const { v4: uuidv4 } = require('uuid');

class PersonalEvaluation {
    constructor(account, evaluation) {
        this._id = uuidv4();
        this.account = account;
        this.evaluation = evaluation; // 文本形式的个人评价
    }

    async save() {
        const db = await connect();
        const collection = db.collection('personalEvaluations');
        const result = await collection.insertOne(this);
        return result.insertedId;
    }

    static async findByAccount(account) {
        const db = await connect();
        const collection = db.collection('personalEvaluations');
        return await collection.find({ account: account }).toArray();
    }
}

module.exports = PersonalEvaluation;
