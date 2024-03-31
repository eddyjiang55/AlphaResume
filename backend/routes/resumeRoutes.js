const express = require('express');
const { uploadPDFToGridFS } = require('../services/pdfUploadService'); // 假设你已经设置好了这个服务
const ResumeHistory = require('../mongodb/models/ResumeHistory'); // 假设你已经定义好了这个模型
const router = express.Router();

// 假设有一个用于处理文件上传的中间件
const upload = require('../middleware/uploadMiddleware');


// 上传简历并保存记录
router.post('/resume-history', upload.single('pdfFile'), async (req, res) => {
    try {
        // 从请求体获取account、createdAt和可选的id
        const { account, createdAt, id } = req.body;
        const pdfPath = req.file ? req.file.path : null; // 获取上传的文件路径

        // 根据提供的信息创建新的ResumeHistory实例，包括可选的id
        const newResume = new ResumeHistory(account, createdAt, pdfPath, id);

        // 保存到数据库并获取_id
        const insertedId = await newResume.save();

        // 发送成功响应并包含_id
        res.status(200).json({ 
            message: "Resume uploaded successfully",
            _id: insertedId // 返回新创建记录的_id
        });
    } catch (error) {
        // 处理并返回错误信息
        res.status(500).json({ message: "Failed to upload resume", error: error.toString() });
    }
});

router.delete('/resume-history/:_id', async (req, res) => {
    try {
        const _id = req.params._id; // 从URL参数中获取_id

        // 调用ResumeHistory的deleteById方法执行删除操作
        const result = await ResumeHistory.deleteById(_id);

        if (result.deletedCount === 0) {
            // 如果没有找到对应的文档来删除
            return res.status(404).json({ message: "No resume found with the provided _id" });
        }

        // 如果成功删除，返回成功响应
        res.json({ message: "Resume successfully deleted" });
    } catch (error) {
        // 处理可能的错误
        res.status(500).json({ message: "Failed to delete resume", error: error.toString() });
    }
});

router.get('/resume-history/:account', async (req, res) => {
    const account = req.params.account;

    try {
        const resumes = await ResumeHistory.findByAccount(account);
        res.status(200).json(resumes);
    } catch (error) {
        console.error("Error fetching resumes:", error);
        res.status(500).json({ message: "Failed to fetch resumes", error: error.toString() });
    }
});

module.exports = router;
