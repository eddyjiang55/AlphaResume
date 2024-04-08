import { type } from "os";

export const bioQues = [
  {
    type: "end",
    text: "了解，接下来，请提供你的年龄、目前所在地和联系方式，包括电话号码和电子邮件地址。",
    sender: "bot",
  }
];

export const educationQues = [
  {
    type: "text",
    text: "谢谢，我需要了解一下你的学历信息。你目前就读的或最高的学历是什么？",
    sender: "bot",
  }, {
    type: "text",
    loop: true,
    text: "明白了，请告诉我你[博士/硕士/本科]的专业、所在学校的名称和就读时间（起止日期，具体到年月）。",
    sender: "bot",
  }, {
    type: "text",
    loop: true,
    text: "感谢提供。在[博士/硕士/本科]阶段，你的GPA是多少呢？有上过哪些核心课程呢？如果在校期间有取得奖学金或证书荣誉等也可以一并告诉我。",
    sender: "bot",
  }, {
    type: "choice",
    loop: true,
    text: "好的，你在[博士/硕士/本科]阶段，是否有过交流或交换经历呢？",
    sender: "bot",
  }, {
    type: "optional",
    loop: true,
    text: "很好，请问在[博士/硕士/本科]阶段的交流或交换经历中，你的专业、交换学校的名称和就读时间（起止日期，具体到年月）。",
    sender: "bot",
  }, {
    type: "optional",
    loop: true,
    text: "在[xx大学]交换期间，你的GPA是多少呢？如果在校期间有取得奖学金或证书荣誉等也可以一并告诉我。",
    sender: "bot",
  }, {
    type: "loop",
    loop: true,
    text: "请告诉我是否有其他学历信息需要补充。",
    sender: "bot",
  }, {
    type: "end",
    text: "明白了，感谢提供这些信息。我们现在已经详细了解了你的教育背景和交流经历。接下来，让我们来到你的实习经历。",
    sender: "bot",
  }
];

const internshipQues = [
  {
    type: "choice",
    text: "请问你是否有过实习经历呢？",
    sender: "bot",
  }, {
    type: "optional",
    loop: true,
    text: "最近一次实习，你在哪家公司实习的呢？是在哪个城市进行这段实习的呢？或者是远程实习？",
    sender: "bot",
  }, {
    type: "optional",
    loop: true,
    text: "很不错，请告诉我你在[xx公司]实习的岗位、所在部门和具体起止日期，包括月份和年份。",
    sender: "bot",
  }, {
    type: "optional",
    loop: true,
    text: "感谢提供。在这段时间里你主要负责哪些工作职责呢？请尽可能详细地描述一下你的工作内容。",
    sender: "bot",
  }, {
    type: "optional",
    loop: true,
    text: "在实习期间，你是否有参与过一些项目或活动呢？如果有，可以告诉我你参与的项目名称和具体职责。",
    sender: "bot",
  },
];