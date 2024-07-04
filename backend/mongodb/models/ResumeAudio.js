const { connect } = require('../dbconfig');
const { v4: uuidv4 } = require('uuid'); // 引入UUID生成器

class ResumeAudio {
    constructor(audio, id = null) {
        this._id = id ? id : uuidv4(); // 使用UUID生成ID
        this.audio = audio;
    }

    // 保存当前实例到数据库
    async save() {
        const db = await connect();
        const collection = db.collection('resumeAudio');
        // 插入文档
        const result = await collection.insertOne({
            _id: this._id,
            audio: this.audio
        });
        // 返回新插入文档的_id
        return result.insertedId;
    }

    // 通过ID查找音频记录
    static async findById(_id) {
        const db = await connect();
        const collection = db.collection('resumeAudio');
        const resumeAudio = await collection.findOne({ _id: _id });
        return resumeAudio;
    }

    // 根据ID删除音频记录
    static async deleteById(_id) {
        const db = await connect();
        const collection = db.collection('resumeAudio');
        const result = await collection.deleteOne({ _id: _id });
        return result;
    }

    // 更新音频记录
    static async updateById(_id, newAudio) {
        const db = await connect();
        const collection = db.collection('resumeAudio');
        const result = await collection.updateOne(
            { _id: _id },
            { $set: { audio: newAudio } }
        );
        return result;
    }
}

module.exports = ResumeAudio;
