const express = require('express');
const router = express.Router();
const JobInformation = require('../mongodb/models/JobInformation'); // 确保路径正确
const { connect } = require('../mongodb/dbconfig');


// 添加新的职位信息
router.post('/job-information', async (req, res) => {
    try {
        const { 岗位描述, 岗位要求, 岗位关键词 } = req.body;
        const jobInfo = new JobInformation(岗位描述, 岗位要求, 岗位关键词);
        const result = await jobInfo.save();
        res.status(201).json({ message: '职位信息添加成功', data: result });
    } catch (error) {
        console.error("Error object:", error);
        console.error("Error message:", error.message);
        res.status(500).json({ message: '添加职位信息时出错', error: error.message });
    }
    
});

// 根据ID查找职位信息
router.get('/job-information/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const jobInfo = await JobInformation.findById(id);
        if (jobInfo) {
            res.status(200).json(jobInfo);
        } else {
            res.status(404).json({ message: '未找到职位信息' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: '查询职位信息时出错', error: error });
    }
});

// 更新职位信息
router.patch('/job-information/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updateData = req.body;
        const result = await JobInformation.update(id, updateData);
        res.status(200).json({ message: '职位信息更新成功', data: result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: '更新职位信息时出错', error: error });
    }
});

// 删除职位信息
router.delete('/job-information/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const result = await JobInformation.deleteById(id);
        res.status(200).json({ message: '职位信息删除成功', data: result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: '删除职位信息时出错', error: error });
    }
});

// 根据关键词查找职位信息（可选）
router.get('/job-information/keyword/:keyword', async (req, res) => {
    try {
        const keyword = req.params.keyword;
        const jobs = await JobInformation.findByKeyword(keyword);
        res.status(200).json(jobs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: '根据关键词查询职位信息时出错', error: error });
    }
});

module.exports = router;
