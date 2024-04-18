const { connect } = require('../dbconfig'); // 确保路径正确
const { v4: uuidv4 } = require('uuid'); // 引入UUID库


class ImprovedUser {
    constructor(基本信息, 教育经历, 工作_实习经历, 项目经历, 获奖信息, 语言能力, 技能, id = null) {
        this._id = id || uuidv4(); // 如果提供了id，则使用该id；否则，生成一个新的UUID
        this.基本信息 = 基本信息;
        this.教育经历 = 教育经历;
        this.工作_实习经历 = 工作_实习经历;
        this.项目经历 = 项目经历;
        this.获奖信息 = 获奖信息;
        this.语言能力 = 语言能力;
        this.技能 = 技能;
    }

    async save() {
        const db = await connect();
        const collection = db.collection('improvedUser'); // 修改集合名称为'improvedUser'
        const result = await collection.insertOne({
            _id: this._id,
            基本信息: this.基本信息,
            教育经历: this.教育经历,
            工作_实习经历: this.工作_实习经历,
            项目经历: this.项目经历,
            获奖信息: this.获奖信息,
            语言能力: this.语言能力,
            技能: this.技能
        });
        return result.insertedId; // 返回插入文档的_id
    }

    static async findById(_id) {
        const db = await connect();
        const collection = db.collection('improvedUser'); // 使用新的集合名称'improvedUser'
        const user = await collection.findOne({ _id: _id });
        return user;
    }

    static async update(_id, updateData) {
        const db = await connect();
        const collection = db.collection('improvedUser'); // 使用新的集合名称'improvedUser'
        const result = await collection.updateOne({ _id: _id }, { $set: updateData });
        return result;
    }

    static async deleteById(_id) {
        const db = await connect();
        const collection = db.collection('improvedUser'); // 使用新的集合名称'improvedUser'
        const result = await collection.deleteOne({ _id: _id });
        return result;
    }
}

module.exports = ImprovedUser;
