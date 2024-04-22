const express = require('express');
const router = express.Router();
const ImprovedUser = require('../mongodb/models/ImprovedUser.js'); // 确保路径与你的项目结构相匹配

// 创建新的用户
router.post('/improved-users', async (req, res) => {
    try {
        const newUser = new ImprovedUser(
            req.body.基本信息,
            req.body.个人评价, // 添加个人评价的处理
            req.body.教育经历,
            req.body.职业经历,
            req.body.项目经历,
            req.body.获奖与证书,
            req.body.语言,
            req.body.技能,
            req.body.科研论文与知识产权
        );
        const _id = await newUser.save();
        res.status(201).json({ message: 'Improved user created successfully', _id: _id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to create improved user', error: error.toString() });
    }
});

// 根据ID查询用户
router.get('/improved-users/:_id', async (req, res) => {
    try {
        const user = await ImprovedUser.findById(req.params._id);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to retrieve user', error: error.toString() });
    }
});

// 根据ID和类型查询用户的特定信息
router.get('/improved-users/:_id/:type', async (req, res) => {
    try {
        const { _id, type } = req.params;
        const user = await ImprovedUser.findById(_id);
        if (user) {
            if (user[type]) {  // 确保类型存在于用户数据中
                res.status(200).json(user[type]);
            } else {
                res.status(404).json({ message: 'Requested information type not found' });
            }
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to retrieve user', error: error.toString() });
    }
});


// 更新用户信息
router.patch('/improved-users/:_id', async (req, res) => {
    try {
        const updateResult = await ImprovedUser.update(req.params._id, req.body);
        if (updateResult.modifiedCount === 0) {
            return res.status(404).json({ message: 'No user found to update' });
        }
        res.json({ message: 'User updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to update user', error: error.toString() });
    }
});

// 删除用户
router.delete('/improved-users/:_id', async (req, res) => {
    try {
        const deleteResult = await ImprovedUser.deleteById(req.params._id);
        if (deleteResult.deletedCount === 0) {
            return res.status(404).json({ message: 'No user found to delete' });
        }
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to delete user', error: error.toString() });
    }
});

// POST请求，保存数据到相应的集合
// 更新个人信息数据
router.post('/save-data', async (req, res) => {
    const { id, type, data } = req.body;

    try {
        // 根据type决定更新哪个部分
        let updatePath = {};
        switch (type) {
            case 'basicInformation':  // 新增的基本信息处理
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

        // 更新数据库记录
        const result = await ImprovedUser.update(id, updatePath);
        if (result.modifiedCount === 0) {
            return res.status(404).json({ message: "No record found to update." });
        }
        res.status(200).json({ message: "Data updated successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to update data", error: error.toString() });
    }
});

module.exports = router;
