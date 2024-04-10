const { connect } = require('../dbconfig');
const { v4: uuidv4 } = require('uuid');

class AwardsAndCertifications {
    constructor(account, awards, certifications) {
        this._id = uuidv4();
        this.account = account;
        this.awards = awards; // 包含奖项的数组，每个奖项对象包含奖项名称、获奖时间、颁奖机构、获奖级别、获奖名次、描述等信息
        this.certifications = certifications; // 包含证书的数组，每个证书对象包含证书名称、颁发机构、获取时间、描述等信息
    }

    async save() {
        const db = await connect();
        const collection = db.collection('awardsAndCertifications');
        const result = await collection.insertOne(this);
        return result.insertedId;
    }

    static async findByAccount(account) {
        const db = await connect();
        const collection = db.collection('awardsAndCertifications');
        const results = await collection.find({ account: account }).toArray();
        return results;
    }
}

module.exports = AwardsAndCertifications;
