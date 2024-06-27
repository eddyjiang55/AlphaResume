const express = require('express');
const router = express.Router();
const ResumeChat = require('../mongodb/models/ResumeChat'); // 根据你实际的models文件路径修改
const ImprovedUser = require('../mongodb/models/ImprovedUser.js');
const { spawn } = require('child_process');
const path = require('path');

function getFormattedDate() {
    const date = new Date();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-indexed
    const day = date.getDate().toString().padStart(2, '0');
    return `${month}.${day}`;
}

// 获取 Python 脚本的绝对路径
const pythonScriptPath = path.resolve(__dirname, '../pyScripts/AI_asking_new.py');

router.post('/resume-chat', async (req, res) => {
    try {
        const { userAccount, messages } = req.body;
        const currentDate = getFormattedDate();
        const newUser = new ImprovedUser(
            { 姓: "", 名: "", 手机号码: "", 邮箱: "", 微信号: "", title: `${currentDate}聊天记录` },
            "",
            [{
                "学历": "",
                "学校名称": "",
                "城市": "",
                "国家": "",
                "起止时间": "",
                "院系": "",
                "专业": "",
                "GPA": "",
                "获奖记录": [""],
                "主修课程": [""]
            }],
            [{
                "公司名称": "",
                "城市": "",
                "国家": "",
                "起止时间": "",
                "部门": "",
                "职位": "",
                "职责/业绩描述": "",
            }],
            [{
                "项目名称": "",
                "城市": "",
                "国家": "",
                "起止时间": "",
                "项目角色": "",
                "项目链接": "",
                "项目成就": "",
                "项目描述": "",
                "项目职责": ""
            }],
            {
                "获奖": [{
                    "奖项名称": "",
                    "获奖时间": "",
                    "颁奖机构": "",
                    "获奖级别": "",
                    "获奖名次": "",
                    "描述": "",
                }],
                "证书": [{
                    "证书名称": "",
                    "取得时间": "",
                    "颁发机构": "",
                    "证书详情": "",
                }]
            },
            [{
                "语言": "",
                "熟练度": "",
                "证书/资格认证": "",
                "成绩": ""
            }],
            [{
                "技能名称": "",
                "熟练度": "",
            }],
            {
                "科研论文": [{
                    "论文标题": "",
                    "作者顺序": "",
                    "期刊/会议": "",
                    "出版时间": "",
                    "DOI/链接": "",
                    "研究描述": "",
                    "个人贡献": "",
                }],
                "知识产权": [{
                    "专利名称": "",
                    "申请/授权日期": "",
                    "专利号": "",
                    "描述": "",
                }]
            },
        );
        const resume_id = await newUser.save();

        const resumeChat = new ResumeChat(userAccount, messages, resume_id);
        const _id = await resumeChat.save();

        // 调用 Python 文件
        const pythonProcess = spawn('python3', [pythonScriptPath, _id, resume_id]);

        pythonProcess.stdout.on('data', (data) => {
            console.log(data.toString());
        });

        pythonProcess.stderr.on('data', (data) => {
            console.error(`stderr: ${data}`);
            res.status(500).json({ message: 'Failed to create resume chat', error: data.toString() });
        });

        pythonProcess.on('close', async (code) => {
            console.log(`child process exited with code ${code}`);
            const record = await ResumeChat.findById(_id);
            const messageList = record.messages;
            const lastRoundOfChat = messageList[messageList.length - 1];
            const lastMessage = lastRoundOfChat.question;
            const quesId = lastRoundOfChat.id;
            res.status(200).json({ id: _id, message: lastMessage, quesId: quesId });
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to create resume chat', error: error.toString() });
    }
});

router.put('/resume-chat/:_id', async (req, res) => {
    try {
        const _id = req.params._id;
        const chatRecord = await ResumeChat.findById(_id);
        const resumeId = chatRecord.resumeId;
        const { quesId, answer } = req.body; // Assume the new message is sent in the request body
        await ResumeChat.addAnswer(_id, quesId, answer);

        // 调用 Python 文件
        const pythonProcess = spawn('python3', [pythonScriptPath, _id, resumeId]);

        pythonProcess.stdout.on('data', (data) => {
            console.log(data.toString());
        });

        pythonProcess.stderr.on('data', (data) => {
            console.error(`stderr: ${data}`);
            res.status(500).json({ message: 'Failed to add message', error: data.toString() });
        });

        pythonProcess.on('close', async (code) => {
            console.log(`child process exited with code ${code}`);
            const record = await ResumeChat.findById(_id);
            const messageList = record.messages;
            const lastRoundOfChat = messageList[messageList.length - 1];
            const lastMessage = lastRoundOfChat.question;
            const quesId = lastRoundOfChat.id;
            res.status(200).json({ id: _id, message: lastMessage, quesId: quesId });
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to add message.", error: error.toString() });
    }
});

router.get('/resume-chat/user-account/:userAccount', async (req, res) => {
    try {
        const userAccount = req.params.userAccount;
        const chats = await ResumeChat.findByUserAccount(userAccount);
        res.status(200).json(chats);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to retrieve chats.", error: error.toString() });
    }
});

router.get('/resume-chat/:_id', async (req, res) => {
    try {
        const _id = req.params._id;
        const chat = await ResumeChat.findById(_id);
        if (chat) {
            res.status(200).json(chat);
        } else {
            res.status(404).json({ message: 'Chat not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to retrieve chat.", error: error.toString() });
    }
});

router.delete('/resume-chat/:_id', async (req, res) => {
    try {
        const _id = req.params._id;
        await ResumeChat.deleteById(_id);
        res.json({ message: 'Chat deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to delete chat', error: error.toString() });
    }
});

module.exports = router;
