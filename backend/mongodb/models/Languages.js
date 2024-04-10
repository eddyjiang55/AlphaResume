const { connect } = require('../dbconfig');
const { v4: uuidv4 } = require('uuid');

class Languages {
    constructor(account, languages) {
        this._id = uuidv4();
        this.account = account;
        this.languages = languages; // 数组，包含语言、熟练度、证书、成绩
    }

    async save() {
        const db = await connect();
        const collection = db.collection('languages');
        const result = await collection.insertOne(this);
        return result.insertedId;
    }

    static async findByAccount(account) {
        const db = await connect();
        const collection = db.collection('languages');
        return await collection.find({ account: account }).toArray();
    }
}

module.exports = Languages;
