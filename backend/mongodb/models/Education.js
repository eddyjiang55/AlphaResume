const { connect } = require('../dbconfig');
const { v4: uuidv4 } = require('uuid');

class Education {
    constructor({ account, degree, schoolName, wechatId, city, country, period, department, major, gpa, ranking, awards, mainCourses }) {
        this._id = uuidv4(); // 保留_id作为内部标识符
        this.account = account;
        this.degree = degree;
        this.schoolName = schoolName;
        this.wechatId = wechatId;
        this.city = city;
        this.country = country;
        this.period = period;
        this.department = department;
        this.major = major;
        this.gpa = gpa;
        this.ranking = ranking;
        this.awards = awards;
        this.mainCourses = mainCourses;
    }

    // 保存当前实例到数据库
    async save() {
        const db = await connect();
        const collection = db.collection('educationRecords');
        const result = await collection.insertOne(this);
        return result.insertedId;
    }

    // 根据account查找教育记录
    static async findByAccount(account) {
        const db = await connect();
        const collection = db.collection('educationRecords');
        const educationRecords = await collection.find({ account }).toArray();
        return educationRecords;
    }

    // 更新指定account的教育记录
    static async updateByAccount(account, updateData) {
        const db = await connect();
        const collection = db.collection('educationRecords');
        const result = await collection.updateMany({ account }, { $set: updateData });
        return result;
    }

    // 删除指定account的教育记录
    static async deleteByAccount(account) {
        const db = await connect();
        const collection = db.collection('educationRecords');
        const result = await collection.deleteMany({ account });
        return result;
    }
}

module.exports = Education;
