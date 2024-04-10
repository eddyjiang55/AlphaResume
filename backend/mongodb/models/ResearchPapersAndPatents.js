const { connect } = require('../dbconfig');
const { v4: uuidv4 } = require('uuid');

class ResearchPapersAndPatents {
    constructor(account, researchPapers, patents) {
        this._id = uuidv4();
        this.account = account;
        this.researchPapers = researchPapers; // 数组，包含论文标题、作者排序、期刊、出版时间、链接、研究描述、个人贡献等
        this.patents = patents; // 数组，包含专利名称、专利号、授权日期、描述等
    }

    async save() {
        const db = await connect();
        const collection = db.collection('researchPapersAndPatents');
        const result = await collection.insertOne(this);
        return result.insertedId;
    }

    static async findByAccount(account) {
        const db = await connect();
        const collection = db.collection('researchPapersAndPatents');
        return await collection.find({ account: account }).toArray();
    }
}

module.exports = ResearchPapersAndPatents;
