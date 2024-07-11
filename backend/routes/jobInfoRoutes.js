const express = require('express');
const router = express.Router();
const JobInformation = require('../mongodb/models/JobInformation'); // 确保路径正确
const { spawn } = require('child_process');
const { connect } = require('../mongodb/dbconfig'); // 确保路径正确
const path = require('path');

// 添加新的职位信息
router.post('/job-information', async (req, res) => {
    try {
        const { 岗位名称, 岗位描述, 岗位要求, 岗位关键词, 工作内容关键词, id } = req.body;
        const jobInfo = new JobInformation(岗位名称, 岗位描述, 岗位要求, 岗位关键词, 工作内容关键词, id);
        const insertedId = await jobInfo.save();
        res.status(201).json({ message: '职位信息添加成功', _id: insertedId });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: '添加职位信息时出错', error: error.toString() });
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
        res.status(500).json({ message: '查询职位信息时出错', error: error.toString() });
    }
});

// 更新职位信息
router.patch('/job-information/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updateData = req.body;
        const result = await JobInformation.updateById(id, updateData);
        if (result.modifiedCount === 0) {
            res.status(404).json({ message: '未找到职位信息或未做任何更新' });
        } else {
            res.status(200).json({ message: '职位信息更新成功', data: result });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: '更新职位信息时出错', error: error.toString() });
    }
});

// 删除职位信息
router.delete('/job-information/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const result = await JobInformation.deleteById(id);
        if (result.deletedCount === 0) {
            res.status(404).json({ message: '未找到职位信息' });
        } else {
            res.status(200).json({ message: '职位信息删除成功' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: '删除职位信息时出错', error: error.toString() });
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
        res.status(500).json({ message: '根据关键词查询职位信息时出错', error: error.toString() });
    }
});

// 根据岗位字符串计算相似性并返回匹配结果
router.post('/job-information/match', async (req, res) => {
    try {
        const { jobString } = req.body;
        const pythonProcess = spawn('python3', [path.join(__dirname, '../calculate_similarity.py'), jobString]);

        pythonProcess.stdout.on('data', (data) => {
            const result = JSON.parse(data.toString());
            const { bestMatch, similarity } = result;
            const threshold = 0.8; // 设置相似度阈值
            const matched = similarity >= threshold;
            
            const response = {
                job_information: bestMatch.job_information,
                resume_guidance: bestMatch.resume_guidance,
                matched: matched
            };
            res.status(200).json(response);
        });

        pythonProcess.stderr.on('data', (data) => {
            console.error('stderr:', data.toString());
            res.status(500).json({ message: 'Error occurred during similarity calculation' });
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error occurred during matching', error: error.toString() });
    }
});

// 提取所有的岗位名称
router.get('/job-titles', async (req, res) => {
    try {
        const db = await connect();
        const collection = db.collection('jobInformation');
        const jobTitles = await collection.distinct('岗位名称');
        res.status(200).json(jobTitles);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: '获取岗位名称时出错', error: error.toString() });
    }
});
module.exports = router;
