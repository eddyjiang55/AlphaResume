const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const { connect } = require('../mongodb/dbconfig');

// 确保目标文件夹存在
const uploadDir = 'uploads/resume-template';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// 设置文件存储路径和文件名
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        cb(null, uuidv4() + path.extname(file.originalname)); // 使用 UUID 作为文件名
    }
});

const upload = multer({ storage: storage });

router.post('/resume-template', upload.fields([{ name: 'template' }, { name: 'template_null' }]), async (req, res) => {
    try {
        const templateFile = req.files['template'][0];
        const templateNullFile = req.files['template_null'][0];

        // 存储文件路径
        const resumeTemplate = {
            _id: uuidv4(),
            templatePath: templateFile.path,
            templateNullPath: templateNullFile.path
        };

        // 假设你有一个数据库集合 'resumeTemplates' 来存储这些信息
        const db = await connect();
        const collection = db.collection('resumeTemplates');
        await collection.insertOne(resumeTemplate);

        res.status(201).json({ message: 'Resume template created successfully', _id: resumeTemplate._id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to create resume template', error: error.toString() });
    }
});

router.get('/resume-template/:_id', async (req, res) => {
    try {
        const _id = req.params._id;
        const db = await connect();
        const collection = db.collection('resumeTemplates');
        const template = await collection.findOne({ _id });

        if (template) {
            const filePath = path.resolve(template.templatePath);
            res.download(filePath, 'template.md'); // 下载文件
        } else {
            res.status(404).json({ message: 'Template not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to retrieve template.", error: error.toString() });
    }
});

router.get('/resume-template-null/:_id', async (req, res) => {
    try {
        const _id = req.params._id;
        const db = await connect();
        const collection = db.collection('resumeTemplates');
        const templateNull = await collection.findOne({ _id });

        if (templateNull) {
            const filePath = path.resolve(templateNull.templateNullPath);
            res.download(filePath, 'template_null.md'); // 下载文件
        } else {
            res.status(404).json({ message: 'Template not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to retrieve template.", error: error.toString() });
    }
});

module.exports = router;
