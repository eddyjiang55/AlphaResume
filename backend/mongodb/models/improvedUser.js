class ImprovedUser {
    constructor(基本信息, 教育经历, 工作_实习经历, 项目经历, 获奖信息, 语言能力, 技能) {
      this.基本信息 = 基本信息;
      this.教育经历 = 教育经历;
      this.工作_实习经历 = 工作_实习经历;
      this.项目经历 = 项目经历;
      this.获奖信息 = 获奖信息;
      this.语言能力 = 语言能力;
      this.技能 = 技能;
    }
  
    // 实例方法：保存用户信息到数据库
  async save() {
    const db = await connect();
    const collection = db.collection('improved_users');
    const result = await collection.insertOne(this);
    return result;
  }

  // 静态方法：根据ID查找用户
  static async findById(userId) {
    const db = await connect();
    const collection = db.collection('improved_users');
    const user = await collection.findOne({ userId: userId });
    return user;
  }

  // 实例方法：更新用户信息
  async update(userId, updateData) {
    const db = await connect();
    const collection = db.collection('improved_users');
    const result = await collection.updateOne({ userId: userId }, { $set: updateData });
    return result;
  }

  // 静态方法：根据ID删除用户
  static async deleteById(userId) {
    const db = await connect();
    const collection = db.collection('improved_users');
    const result = await collection.deleteOne({ userId: userId });
    return result;
  }
  }
  