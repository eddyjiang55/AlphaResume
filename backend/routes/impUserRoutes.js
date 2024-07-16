const express = require('express');
const router = express.Router();
const ImprovedUser = require('../mongodb/models/ImprovedUser.js'); // 确保路径与你的项目结构相匹配
const Account = require('../mongodb/models/Account'); // 引入Account模型
const { spawn } = require('child_process');
const ResumeHistory = require('../mongodb/models/ResumeHistory');

// 定义英文到中文的映射
const typeToChinese = {
    basicInformation: '基本信息',
    personalEvaluation: '个人评价',
    educationHistory: '教育经历',
    professionalExperience: '职业经历',
    projectExperience: '项目经历',
    awardsAndCertificates: '获奖与证书',
    skills: '技能',
    languages: '语言',
    researchPapersAndPatents: '科研论文与知识产权'
};
// 辅助函数：格式化日期为 YYYY-MM-DD
function formatDate(date) {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = (d.getMonth() + 1).toString().padStart(2, '0'); // 月份从0开始，所以需要加1
    const day = d.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
}

let processResult = {};

// 创建 ImprovedUser
router.post('/improved-users', async (req, res) => {
    try {
        const { phoneNumber } = req.body;
        const newUser = new ImprovedUser({}, new Date(), new Date(), "", 0);
        const id = await newUser.save(phoneNumber);
        res.status(201).json({ message: 'Improved user created successfully', _id: id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to create improved user', error: error.toString() });
    }
});



// 根据ID查询用户
router.get('/improved-users/:_id', async (req, res) => {
    try {
        const resumeRecord = await ImprovedUser.findById(req.params._id);
        if (!resumeRecord) {
            return res.status(404).json({ message: 'Resume record not found' });
        }

        // 返回用户信息
        res.status(200).json(resumeRecord);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to retrieve user', error: error.toString() });
    }
});

router.get('/improved-users/:_id/meta-data', async (req, res) => {
    try {
        const resumeRecord = await ImprovedUser.findById(req.params._id);
        if (!resumeRecord) {
            return res.status(404).json({ message: 'Resume record not found' });
        }
        const title = resumeRecord.personal_data['基本信息']['title'];

        // 返回用户信息
        res.status(200).json({ _id: resumeRecord._id, resumeId: resumeRecord.resumeId, page: resumeRecord.page, title: title, updatedAt: resumeRecord.updatedAt });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to retrieve user', error: error.toString() });
    }
});


// 根据ID和类型查询用户的特定信息
router.get('/improved-users/:_id/:type', async (req, res) => {
    try {
        const { _id, type } = req.params;
        //console.log(`Received type: ${type}`);
        const chineseType = typeToChinese[type]; // 获得中文字段名
        //console.log(`Mapped chineseType: ${chineseType}`);

        if (!chineseType) {
            return res.status(400).json({ message: "Invalid type specified" });
        }

        const resumeRecord = await ImprovedUser.findById(_id);
        console.log(resumeRecord);
        if (resumeRecord) {
            try {
                const responseData = resumeRecord.personal_data[chineseType] || null; // 如果指定类型不存在，返回 null
                const updatedAt = resumeRecord.updatedAt;
                res.status(200).json({ data: responseData, _id: _id, updateTime: updatedAt });
            } catch (error) {
                console.error(error);
                res.status(200).json({ data: { title: "" }, _id: _id, updateTime: "" });
            }
        } else {
            res.status(404).json({ message: 'Resume record not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to retrieve user', error: error.toString() });
    }
});


// // 更新用户信息
// router.patch('/improved-users/:_id', async (req, res) => {
//     try {
//         const updateResult = await ImprovedUser.update(req.params._id, req.body);
//         if (updateResult.modifiedCount === 0) {
//             return res.status(404).json({ message: 'No user found to update' });
//         }

//         // 返回更新成功的响应
//         res.status(200).json({ message: 'User updated successfully' });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Failed to update user', error: error.toString() });
//     }
// });

// 删除 ImprovedUser 及其在 Account 中的引用
router.delete('/improved-users', async (req, res) => {
    try {
        const { improvedUserId, phoneNumber } = req.body;
        const result = await ImprovedUser.delete(improvedUserId, phoneNumber);
        if (result) {
            res.status(200).json({ message: 'Improved user deleted successfully' });
        } else {
            res.status(404).json({ message: 'Improved user not found or failed to delete' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to delete improved user', error: error.toString() });
    }
});



// 更新个人信息数据
router.post('/save-data', async (req, res) => {
    const { id, type, data, page } = req.body;
    console.log('Request body:', req.body);
    try {
        // 根据type决定更新哪个部分
        let updatePath = {};
        switch (type) {
            case 'basicInformation':
                updatePath['基本信息'] = data;
                break;
            case 'personalEvaluation':
                updatePath['个人评价'] = data;
                break;
            case 'educationHistory':
                updatePath['教育经历'] = data;
                break;
            case 'professionalExperience':
                updatePath['职业经历'] = data;
                break;
            case 'projectExperience':
                updatePath['项目经历'] = data;
                break;
            case 'awardsAndCertificates':
                updatePath['获奖与证书'] = data;
                break;
            case 'skills':
                updatePath['技能'] = data;
                break;
            case 'languages':
                updatePath['语言'] = data;
                break;
            case 'researchPapersAndPatents':
                updatePath['科研论文与知识产权'] = data;
                break;
            default:
                return res.status(400).json({ message: "Invalid type specified" });
        }

        // 添加page的更新
        if (page !== undefined) {
            await ImprovedUser.updatePage(id, page);
        }

        // 更新数据库记录
        const result = await ImprovedUser.update(id, updatePath);
        if (result.modifiedCount === 0) {
            return res.status(404).json({ message: "No record found to update." });
        }

        res.status(200).json({ resumeId: id, message: "保存成功！" });
    } catch (error) {
        res.status(500).json({ resumeId: id, message: "保存失败！", error: error.toString() });
    }
});



// 生成简历并保存到ResumeHistory
router.post('/improved-users/generate-resume', async (req, res) => {
    const { id, phoneNumber, position } = req.body;

    try {
        const userRecord = await ImprovedUser.findById(id);
        if (!userRecord) {
            return res.status(404).json({ message: 'ImprovedUser not found' });
        }

        const account = await Account.findByPhoneNumber(phoneNumber);
        if (!account) {
            return res.status(404).json({ message: 'Account not found' });
        }

        const createdAt = formatDate(new Date());

        const title = userRecord.personal_data['基本信息']['title'];

        const newResumeHistory = new ResumeHistory(
            account._id,
            createdAt,
            title,
        );
        const resumeHistoryId = await newResumeHistory.save();
        await ImprovedUser.updateResumeId(id, resumeHistoryId);

        const pythonProcess = spawn('python3', ['./pyScripts/generate_cv.py', id, resumeHistoryId, position], {
            env: {
                ...process.env,
            }
        });
        console.log('Python process spawned:', pythonProcess.pid);
        processResult[id] = { status: 'running', progress: 0 };

        pythonProcess.stdout.on('data', (data) => {
            const output = data.toString();
            console.log(`stdout: ${output}`);

            // Check if the output contains a progress message
            const progressMatch = output.match(/PROGRESS: (\d+)/);
            if (progressMatch) {
                const progressValue = parseInt(progressMatch[1], 10);
                processResult[id].progress = progressValue;
            }

        });

        pythonProcess.stderr.on('data', (data) => {
            console.log(`stderr: ${data}`);
        });

        pythonProcess.on('close', async (code) => {
            console.log(`child process exited with code ${code}`);
            processResult[id].status = 'done';

            res.status(200).json({ message: "Resume generation completed", resumeHistoryId });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to generate resume', error: error.toString() });
    }
});

router.post('/improved-users/resume-result', (req, res) => {
    const { id } = req.body;
    const result = processResult[id];
    if (!result) {
        return res.status(404).json({ message: 'No result found' });
    }
    if (result.status === 'running') {
        return res.status(202).json({ message: 'Result is still running', progress: result.progress });
    }
    if (result.status === 'done') {
        return res.status(200).json({ message: 'Result is ready' });
    }
});

router.post('/improved-users/markdown', async (req, res) => {
    const { id } = req.body;
    try {
        const record = await ImprovedUser.findById(id);
        if (!record) {
            return res.status(404).send({ message: "User not found" });
        }
        console.log(record);
        const resumeId = record.resumeId;
        if (!resumeId) {
            return res.status(404).send({ message: "resumeId not found for the user" });
        }
        console.log(resumeId);
        const resumeRecord = await ResumeHistory.findById(resumeId);
        if (!resumeRecord) {
            return res.status(404).send({ message: "Resume record not found" });
        }
        const markdown = resumeRecord.markdownData;

        res.type('text/markdown').status(200).send(markdown);
    } catch (error) {
        console.error('Failed to retrieve user data:', error);
        res.status(500).send({ message: "Server error while retrieving data" });
    }
});

module.exports = router;
