const { connect } = require('../dbconfig');
const { ObjectId } = require('mongodb'); // 确保在文件顶部引入了ObjectId

class JobInformation {
    constructor(岗位描述, 岗位要求, 岗位关键词) {
      this.岗位描述 = 岗位描述;
      this.岗位要求 = 岗位要求;
      this.岗位关键词 = 岗位关键词;
    }
  
    // 创建（Save）
    async save() {
      const db = await connect();
      const collection = db.collection('job_information');
      const result = await collection.insertOne(this);
      return result;
    }
  
    // 读取（Find）
    static async findById(id) {
      const db = await connect();
      const collection = db.collection('job_information');
      const jobInfo = await collection.findOne({ _id: new ObjectId(id) });
      return jobInfo;
    }
  
    // 更新（Update）
    async update(id, updateData) {
      const db = await connect();
      const collection = db.collection('job_information');
      const result = await collection.updateOne({ _id: id }, { $set: updateData });
      return result;
    }
  
    // 删除（Delete）
    static async deleteById(id) {
      const db = await connect();
      const collection = db.collection('job_information');
      const result = await collection.deleteOne({ _id: id });
      return result;
    }
  
    // 额外的功能：根据关键词查找职位信息
    static async findByKeyword(keyword) {
      const db = await connect();
      const collection = db.collection('job_information');
      const jobs = await collection.find({ 岗位关键词: keyword }).toArray();
      return jobs;
    }
  }
  
  module.exports = JobInformation;
  