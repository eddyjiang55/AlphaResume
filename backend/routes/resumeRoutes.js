const express = require('express');
const { uploadPDFToGridFS } = require('../services/pdfUploadService'); // 假设你已经设置好了这个服务
const ResumeHistory = require('../mongodb/models/ResumeHistory'); // 假设你已经定义好了这个模型
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const pdfParse = require('pdf-parse');
const { convertToMarkdown } = require('../utils/pdfToMarkdown'); 

// 假设有一个用于处理文件上传的中间件
const storage = multer.memoryStorage(); // 使用内存存储来处理文件
const upload = multer({ storage: storage });
// const upload = require('../middleware/uploadMiddleware');


// 上传简历并保存记录
router.post('/resume-history', upload.single('pdfFile'), async (req, res) => {
    try {
        // 确认接收到的前端数据
        console.log("Received data from client:", req.body);

        // 检查文件上传状态
        if (!req.file) {
            console.log("Error: No file uploaded");
            return res.status(400).json({ message: "No PDF file uploaded" });
        }
        console.log("File uploaded successfully:", req.file.filename); // 显示上传的文件名

        // 解构请求体中的数据
        const { account, createdAt, title, position } = req.body;
        const pdfData = req.file.buffer; // 从内存中获取PDF文件数据

        // PDF转Markdown转换前的日志
        console.log("Starting conversion from PDF to Markdown for file:", req.file.filename);
        const markdownData = await convertToMarkdown(pdfData);

        // 创建简历记录实例并保存
        console.log("Creating new resume record in database...");
        const newResume = new ResumeHistory({
            account,
            createdAt,
            title,
            position,
            pdfData,
            markdownData
        });

        // 保存简历记录到数据库
        const insertedId = await newResume.save();
        console.log("Resume record saved successfully with ID:", insertedId);

        // 发送成功响应
        res.status(200).json({
            message: "Resume uploaded and processed successfully",
            _id: insertedId
        });
    } catch (error) {
        console.error("Error during resume upload and processing:", error);
        res.status(500).json({ message: "Failed to upload and process resume", error: error.toString() });
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



router.post('/resume-info', upload.single('pdfFile'), async (req, res) => {
    if (req.file) {
        const pdfBuffer = fs.readFileSync(req.file.path);

        pdfParse(pdfBuffer).then(data => {
            // 提取手机号码，去除+86
            const phoneRegex = /(\+\d{2})?\d{11}/g;
            let phones = data.text.match(phoneRegex);
            if (phones) {
                phones = phones.map(phone => phone.startsWith('+86') ? phone.substring(3) : phone);
            }

            // 提取邮箱地址
            const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g;
            const emails = data.text.match(emailRegex);

            // 提取微信号，去除前缀“微信：”或“微信 ”
            const wechatRegex = /微信[：; ]?\s*([a-zA-Z\d_-]{6,20})|wechat[：; ]?\s*([a-zA-Z\d_-]{6,20})/gi;
            let matches;
            let wechats = [];
            while ((matches = wechatRegex.exec(data.text)) !== null) {
                const wechat = matches[1] || matches[2];
                if (wechat) {
                    wechats.push(wechat);
                }
            }

            // 假设姓名位于文本的最顶部，提取前几行尝试识别姓名
            const lines = data.text.split('\n');
            const nameLine = lines.find(line => line && !line.toLowerCase().includes("resume") && !line.toLowerCase().includes("curriculum vitae"));
            let surname = "Unknown"; // 姓
            let givenName = "Unknown"; // 名
            if (nameLine) {
                const nameParts = nameLine.split(/\s+/);
                if (nameParts.length > 0) {
                    surname = nameParts[0].slice(0, 1); // 假设第一个字符为姓
                    givenName = nameParts[0].slice(1); // 剩下的为名
                    if (nameParts.length > 1) {
                        // 如果有多个部分，假设第二部分也是名的一部分
                        givenName += " " + nameParts[1];
                    }
                }
            }
            console.log(data.text);
            res.status(200).json({
                message: "Resume processed successfully",
                phones: phones,
                emails: emails,
                wechats: wechats,
                surname: surname, // 返回提取的姓
                givenName: givenName, // 返回提取的名
            });
        }).catch(error => {
            console.error("Error parsing PDF:", error);
            res.status(500).json({ message: "Failed to process resume", error: error.toString() });
        });
    } else {
        res.status(400).json({ message: "No PDF file uploaded" });
    }
});








module.exports = router;
