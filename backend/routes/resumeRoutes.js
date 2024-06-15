const express = require('express');
const { uploadPDFToGridFS } = require('../services/pdfUploadService'); // 假设你已经设置好了这个服务
const ResumeHistory = require('../mongodb/models/ResumeHistory'); // 假设你已经定义好了这个模型
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const pdfParse = require('pdf-parse');
const { convertToMarkdown } = require('../utils/pdfToMarkdown');
const { spawn } = require('child_process'); // To run Python scripts
const { v4: uuidv4 } = require('uuid');

// 假设有一个用于处理文件上传的中间件
const storage = multer.memoryStorage(); // 使用内存存储来处理文件
const upload = multer({ storage: storage });
// const upload = require('../middleware/uploadMiddleware');

let processResult = {};


// 上传简历并保存记录
router.post('/resume-history', upload.single('pdfFile'), async (req, res) => {
    console.log(req.body);
    try {
        const account = req.body.account;
        const createdAt = req.body.createdAt;
        const title = req.body.title;
        const position = req.body.position;
        const improved_user_id = req.body.improved_user_id;

        if (!req.file) {
            return res.status(400).json({ message: "No PDF file uploaded" });
        }

        const pdfData = req.file.buffer.toString('base64'); // 确保正确编码为Base64
        console.log(`PDF data encoded to Base64, length: ${pdfData.length}`);
        
        const markdownData = await convertToMarkdown(req.file.buffer); // 假设这个函数同步执行并返回Markdown数据

        // 将简历数据保存到数据库
        const newResume = new ResumeHistory(
            account,
            createdAt,
            title,
            position,
            pdfData,
            markdownData
        );

        const resume_history_id = await newResume.save(); // 保存并获取ID
        console.log(`Resume history saved with ID: ${resume_history_id}`);

        // 调用Python脚本进行进一步处理
        const pythonProcess = spawn('python3', ['./pyScripts/pdf_reader.py', resume_history_id, improved_user_id]);
        processResult[improved_user_id] = { status: 'running' };

        pythonProcess.stdout.on('data', (data) => {
            console.log(`stdout: ${data}`);
        });

        pythonProcess.stderr.on('data', (data) => {
            console.error(`stderr: ${data}`);
        });

        pythonProcess.on('close', (code) => {
            console.log(`child process exited with code ${code}`);
            processResult[improved_user_id].status = 'done';
        });

        // Return immediate response
        res.status(200).json({
            message: "Resume uploaded and processing started",
            history_id: resume_history_id,
            _id: improved_user_id,
        });

    } catch (error) {
        console.error("Error uploading and processing resume:", error);
        res.status(500).json({ message: "Failed to upload and process resume", error: error.toString() });
    }
});


router.post('/resume-history/resume_result', async (req, res) => {
    const { id } = req.body;
    console.log(processResult)
    const result = processResult[id];

    if (!result) {
        return res.status(404).json({ message: 'No result found' });
    }

    if (result.status === 'running') {
        return res.status(202).json({ message: 'Result is still running' });
    } else if (result.status === 'done') {
        // remove from processResult
        delete processResult[id];
        return res.status(200).json({ message: 'Result is ready' });
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

router.get('/download-pdf/:resumeHistoryId', async (req, res) => {
    const { resumeHistoryId } = req.params;

    try {
        const resumeHistory = await ResumeHistory.findById(resumeHistoryId);

        if (!resumeHistory) {
            console.log(`No resume history found with ID: ${resumeHistoryId}`);
            return res.status(404).send('PDF not found');
        }

        if (!resumeHistory.pdfData) {
            console.log(`Resume history found, but no PDF data available for ID: ${resumeHistoryId}`);
            return res.status(404).send('PDF not found');
        }

        console.log(`Base64 PDF data length: ${resumeHistory.pdfData.length}`);

        const pdfData = Buffer.from(resumeHistory.pdfData, 'base64');

        console.log(`Decoded PDF data length: ${pdfData.length}`);

        if (pdfData.length === 0) {
            console.log(`Warning: PDF data is empty after conversion from Base64 for ID: ${resumeHistoryId}`);
        }

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename="downloaded_resume.pdf"');
        res.send(pdfData);
    } catch (error) {
        console.error(`Error fetching PDF data for ID: ${resumeHistoryId}`, error);
        res.status(500).send('Internal Server Error');
    }
});



router.get('/resume-details/:resumeHistoryId', async (req, res) => {
    const { resumeHistoryId } = req.params;  // 获取路由参数中的resumeHistoryId

    try {
        const resumeHistory = await ResumeHistory.findById(resumeHistoryId);  // 使用已有的findById方法查找记录

        if (!resumeHistory) {
            return res.status(404).json({ message: 'Resume history not found' });  // 如果没有找到记录，返回404
        }

        // 返回所需的title和createdAt信息
        res.status(200).json({
            title: resumeHistory.title,
            createdAt: resumeHistory.createdAt
        });
    } catch (error) {
        console.error("Error fetching resume details:", error);
        res.status(500).json({ message: "Failed to fetch resume details", error: error.toString() });
    }
});





module.exports = router;