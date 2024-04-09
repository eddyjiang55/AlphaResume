export const bioQues = [
  {
    id: "q1",
    type: "text",
    loop: false,
    text: "[xxx]你好，我是你的简历规划师[xxx]，在帮助你制作一份[应届生求职]简历之前，我需要了解你的一些个人基本信息和过往学习实习经历，对话可以随时开始或暂停，你的资料会被妥善保存，仅用于简历制作。",
    sender: "bot",
    "next": {
      "default": "q2",
    }
  }, {
    id: "q2",
    type: "text",
    loop: false,
    text: "此次交流仅作为初步信息搜集，如有遗漏不用担心，你可以随时告诉我们，我们将为你修改并补充。",
    sender: "bot",
    "next": {
      "default": "q3",
    }
  }, {
    id: "q3",
    type: "ques",
    loop: false,
    text: "首先，可以告诉我你的中文姓名和英文名吗？",
    sender: "bot",
    "next": {
      "default": "q4",
    }
  },
  {
    id: "q4",
    type: "end",
    loop: false,
    text: "了解，接下来，请提供你的年龄、目前所在地和联系方式，包括电话号码和电子邮件地址。",
    sender: "bot",
  }
];

export const educationQues = [
  {
    id: "q1",
    type: "ques",
    loop: false,
    text: "谢谢，我需要了解一下你的学历信息。你目前就读的或最高的学历是什么？",
    sender: "bot",
    "next": {
      "default": "q2",
    }
  }, {
    id: "q2",
    type: "ques",
    loop: true,
    text: "明白了，请告诉我你[博士/硕士/本科]的专业、所在学校的名称和就读时间（起止日期，具体到年月）。",
    sender: "bot",
    "next": {
      "default": "q3",
    }
  }, {
    id: "q3",
    type: "ques",
    loop: true,
    text: "感谢提供。在[博士/硕士/本科]阶段，你的GPA是多少呢？有上过哪些核心课程呢？如果在校期间有取得奖学金或证书荣誉等也可以一并告诉我。",
    sender: "bot",
    "next": {
      "default": "q4",
    }
  }, {
    id: "q4",
    type: "choice",
    loop: true,
    text: "好的，你在[博士/硕士/本科]阶段，是否有过交流或交换经历呢？",
    sender: "bot",
    "next": {
      "yes": "q5",
      "no": "q7",
    }
  }, {
    id: "q5",
    type: "ques",
    loop: true,
    text: "很好，请问在[博士/硕士/本科]阶段的交流或交换经历中，你的专业、交换学校的名称和就读时间（起止日期，具体到年月）。",
    sender: "bot",
    "next": {
      "default": "q6",
    }
  }, {
    id: "q6",
    type: "ques",
    loop: true,
    text: "在[xx大学]交换期间，你的GPA是多少呢？如果在校期间有取得奖学金或证书荣誉等也可以一并告诉我。",
    sender: "bot",
    "next": {
      "default": "q7",
    }
  }, {
    id: "q7",
    type: "choice",
    loop: true,
    text: "请告诉我是否有其他学历信息需要补充。",
    sender: "bot",
    "next": {
      "yes": "q2",
      "no": "q8",
    }
  }, {
    id: "q8",
    type: "end",
    text: "明白了，感谢提供这些信息。我们现在已经详细了解了你的教育背景和交流经历。接下来，让我们来到你的实习经历。",
    sender: "bot",
  }
];

export const internshipQues = [
  {
    id: "q1",
    type: "choice",
    text: "请问你是否有过实习经历呢？",
    sender: "bot",
    loop: false,
    "next": {
      "yes": "q2",
      "no": "q11",
    }
  }, {
    id: "q2",
    type: "ques",
    loop: true,
    text: "最近一次实习，你在哪家公司实习的呢？是在哪个城市进行这段实习的呢？或者是远程实习？",
    sender: "bot",
    "next": {
      "default": "q3",
    }
  }, {
    id: "q3",
    type: "ques",
    loop: true,
    text: "很不错，请告诉我你在[xx公司]实习的岗位、所在部门和具体起止日期，包括月份和年份。",
    sender: "bot",
    "next": {
      "default": "q4",
    }
  }, {
    id: "q4",
    type: "ques",
    loop: true,
    text: "感谢提供。在这段时间里你主要负责哪些工作职责呢？请尽可能详细地描述一下你的工作内容。",
    sender: "bot",
    "next": {
      "default": "q5",
    }
  }, {
    id: "q5",
    type: "ques",
    loop: true,
    text: "在实习期间，你是否有参与过一些项目或活动呢？如果有，可以告诉我你参与的项目名称和具体职责。",
    sender: "bot",
    "next": {
      "default": "q6",
    }
  }, {
    id: "q6",
    type: "ques",
    loop: true,
    text: "为了进一步完善这段经历，是否可以提供一些具体的项目成果或者对[xx]方面的改进措施呢？",
    sender: "bot",
    "next": {
      // "yes": "q2",
      // "no": "q7",
      "default": "q7"
    }
  }, {
    id: "q7",
    type: "text",
    loop: true,
    text: "明白了，感谢提供的信息。你在[xx公司]的实习经历非常丰富，尤其在[xx]的工作表现令人印象深刻。",
    sender: "bot",
    "next": {
      "default": "q8",
    }
  }, {
    id: "q8",
    type: "text",
    loop: true,
    text: "接下来，我将帮你总结并润色你的实习经历，以更好地突显你的专业能力和成就。稍后我会提供给你一份润色后的实习经历，你可随时提出修改或补充的意见。",
    sender: "bot",
    "next": {
      "default": "q9",
    }
  }, {
    id: "q9",
    type: "text",
    loop: true,
    text: "同时，如果你还有其他方面想要强调或添加的信息，也请告诉我。",
    sender: "bot",
    "next": {
      "default": "q10",
    }
  }, {
    id: "q10",
    type: "choice",
    loop: true,
    text: "请问你还有其他实习经历吗？",
    sender: "bot",
    "next": {
      "yes": "q2",
      "no": "q11",
    }
  }, {
    id: "q11",
    type: "end",
    loop: false,
    text: "好的，那我们可以跳过这个部分。",
    sender: "bot",
  }
];

export const projectQues = [
  {
    id: "q1",
    type: "choice",
    text: "非常感谢，除了实习经历，你在校期间是否参与过一些项目或者有其他的校园经历呢？",
    sender: "bot",
    loop: false,
    "next": {
      "yes": "q2",
      "no": "q10",
    }
  }, {
    id: "q2",
    type: "ques",
    loop: true,
    text: "好的，请提供最近一段项目的名称。以及你是在哪个城市进行这段项目的呢？或者是远程参与？",
    sender: "bot",
    "next": {
      "default": "q3",
    }
  }, {
    id: "q3",
    type: "ques",
    loop: true,
    text: "明白，请告诉我你在[xx项目]中担任的岗位、所在部门（如果有）和具体参与时间，具体到年份和月份。",
    sender: "bot",
    "next": {
      "default": "q4",
    }
  }, {
    id: "q4",
    type: "ques",
    loop: true,
    text: "感谢提供。下面请尽可能详细地描述一下你的项目内容，包括项目的背景、目标等等，同时你可以提供在这段时间里主要负责的职责。",
    sender: "bot",
    "next": {
      "default": "q5",
    }
  }, {
    id: "q5",
    type: "text",
    loop: true,
    text: "很出色，你在担任[xxx]期间，你不仅参与了[xxx]，还承担了[xxx]等多方面的职责。",
    sender: "bot",
    "next": {
      "default": "q6",
    }
  }, {
    id: "q6",
    type: "choice",
    loop: true,
    text: "为了更好地润色这段经历，你是否能够提供一些具体的成果或者在项目中取得的成功，以及你是如何[xxx]的呢？这样可以更生动地展示你的[xxx]。",
    sender: "bot",
    "next": {
      "yes": "q7",
      "no": "q7",
    }
  }, {
    id: "q7",
    type: "text",
    loop: true,
    text: "明白了，感谢提供的信息。",
    sender: "bot",
    "next": {
      "default": "q8",
    }
  }, {
    id: "q8",
    type: "text",
    loop: true,
    text: "接下来，我们将继续了解你的其他校园经历。",
    sender: "bot",
    "next": {
      "default": "q9",
    }
  }, {
    id: "q9",
    type: "choice",
    loop: true,
    text: "请问你还有其他项目或者校园经历吗？",
    sender: "bot",
    "next": {
      "yes": "q2",
      "no": "q10",
    }
  }, {
    id: "q10",
    type: "end",
    loop: false,
    text: "好的，那我们可以跳过这个部分。",
    sender: "bot",
  }
];

export const languageQues = [
  {
    id: "q1",
    type: "ques",
    text: "非常感谢，在你的简历中，除了工作和项目经历外，语言能力也是一个关键的部分。请告诉我你掌握的语言以及对每种语言的熟练程度，可以用以下等级划分：普通、流利、高级、母语。如果你有相关语言考试的得分，也请提供。",
    sender: "bot",
    loop: false,
    "next": {
      "default": "q2",
    }
  }, {
    id: "q2",
    type: "end",
    loop: false,
    text: "了解，接下来我们将继续了解你的技能和证书。",
    sender: "bot",
  }
];

export const skillQues = [
  {
    id: "q1",
    type: "choice",
    text: "当然，对于[xx专业]的求职者来说，具备一些相关的IT技能会增强竞争力。在你的专业方向，你是否有一些相关的IT技能，比如熟悉的软件或工具？如果有，请提供相关的信息。如果没有，也请告诉我。",
    sender: "bot",
    loop: false,
    "next": {
      "yes": "q2",
      "no": "q4",
    }
  }, {
    id: "q2",
    type: "ques",
    loop: true,
    text: "好的，请您列出。",
    sender: "bot",
    "next": {
      "default": "q3",
    }
  }, {
    id: "q3",
    type: "choice",
    loop: false,
    text: "除了[xx]软件，你还有其他与[专业]相关的软件或工具的经验吗？比如[xxx]等。如果有，请提供相关的信息。",
    sender: "bot",
    "next": {
      "yes": "q2",
      "no": "q4",
    }
  }, {
    id: "q4",
    type: "end",
    loop: false,
    text: "了解，接下来我们将继续了解你的技能和证书。",
    sender: "bot",
  }
];

export const certificateQues = [
  {
    id: "q1",
    type: "choice",
    text: "了解，请问你是否有过获奖经历或者奖项证书呢？",
    sender: "bot",
    loop: false,
    "next": {
      "yes": "q2",
      "no": "q4",
    }
  }, {
    id: "q2",
    type: "ques",
    loop: true,
    text: "可以分享一下最近一段奖项的具体的获奖情况吗，包括奖项名称、获奖时间以及奖项信息（如有）。",
    sender: "bot",
    "next": {
      "default": "q3",
    }
  }, {
    id: "q3",
    type: "choice",
    loop: true,
    text: "感谢提供。请问你还有其他奖项经历吗？",
    sender: "bot",
    "next": {
      "yes": "q2",
      "no": "q4",
    }
  }, {
    id: "q4",
    type: "end",
    loop: false,
    text: "了解，接下来我们将继续了解你的科研与专利。",
    sender: "bot",
  }
];

export const researchQues = [
  {
    id: "q1",
    type: "choice",
    text: "请问你是否有过科研论文或者知识产权呢？",
    sender: "bot",
    loop: false,
    "next": {
      "yes": "q2",
      "no": "q4",
    }
  }, {
    id: "q2",
    type: "text",
    loop: true,
    text: "可以分享一下这个部分的具体情况吗？",
    sender: "bot",
    "next": {
      "default": "q3",
    }
  }, {
    id: "q3",
    type: "text",
    loop: true,
    text: "科研论文：标题、作者顺序、期刊/会议名称、出版时间、doi和研究描述与个人贡献",
    sender: "bot",
    "next": {
      "default": "q4",
    }
  }, {
    id: "q4",
    type: "ques",
    loop: true,
    text: "知识产权：专利名称、专利号、申请/授权日期和专利描述",
    sender: "bot",
    "next": {
      "default": "q5",
    }
  }, {
    id: "q5",
    type: "choice",
    loop: true,
    text: "感谢提供。请问你还有其他科研论文或者知识产权吗？",
    sender: "bot",
    "next": {
      "yes": "q2",
      "no": "q6",
    }
  }, {
    id: "q6",
    type: "end",
    loop: false,
    text: "了解。",
    sender: "bot",
  }
];

export const endQues = [
  {
    id: "q1",
    type: "choice",
    loop: false,
    text: "信息收集部分就到这里完成了，你还有其他方面想要强调或补充的信息，或者对简历的其他部分有任何修改意见吗？",
    sender: "bot",
    "next": {
      "yes": "q2",
      "no": "q3",
    }
  }, {
    id: "q2",
    type: "ques",
    loop: false,
    text: "请提供你想要补充或修改的信息。",
    sender: "bot",
  }, {
    id: "q3",
    type: "text",
    loop: false,
    text: "接下来，我将为你整理这些信息，制作一份完善的求职简历。",
    sender: "bot",
    "next": {
      "default": "q4",
    }
  }, {
    id: "q4",
    type: "end",
    loop: false,
    text: "以上是初步的简历草稿，如果有其他要添加的信息或对现有信息有任何修改意见，请告诉我。我将根据你的反馈进一步调整。",
    sender: "bot",
  }
];

export const blockData = [
  {
    id: "blcok1",
    questions: bioQues,
    next: "block2",
  },
  {
    id: "block2",
    questions: educationQues,
    next: "block3",
  },
  {
    id: "block3",
    questions: internshipQues,
    next: "block4",
  },
  {
    id: "block4",
    questions: projectQues,
    next: "block5",
  },
  {
    id: "block5",
    questions: languageQues,
    next: "block6",
  },
  {
    id: "block6",
    questions: skillQues,
    next: "block7",
  },
  {
    id: "block7",
    questions: certificateQues,
    next: "block8",
  },
  {
    id: "block8",
    questions: researchQues,
    next: "block9",
  },
  {
    id: "block9",
    questions: endQues,
  },
];