class User {
  constructor(id, 基本信息, 教育经历, 工作_实习经历, 项目经历, 获奖信息, 语言能力, 技能) {
    this.userId = id;
    this.基本信息 = 基本信息;
    this.教育经历 = 教育经历;
    this.工作_实习经历 = 工作_实习经历;
    this.项目经历 = 项目经历;
    this.获奖信息 = 获奖信息;
    this.语言能力 = 语言能力;
    this.技能 = 技能;
  }

  // Add methods for database interaction here
}

module.exports = User;