const express = require('express');
const multer = require('multer');
const fs = require('fs');
const ResumeAudio = require('../mongodb/models/ResumeAudio');

const router = express.Router();
const upload = multer({ dest: 'uploads/' }); // 设置文件上传目录

// 存储音频文件
router.post('/upload-audio', upload.single('audio'), async (req, res) => {
    try {
        const audioPath = req.file.path;
        const audioBuffer = fs.readFileSync(audioPath);

        // 创建ResumeAudio实例并保存到数据库
        const resumeAudio = new ResumeAudio(audioBuffer);
        const audioId = await resumeAudio.save();

        // 删除临时上传的文件
        fs.unlinkSync(audioPath);

        res.status(200).json({ message: 'Audio file uploaded successfully', id: audioId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to upload audio file', error: error.toString() });
    }
});


// Get audio file
router.get('/get-audio/:id', async (req, res) => {
    try {
        const _id = req.params.id;
        const resumeAudio = await ResumeAudio.findById(_id);
        if (!resumeAudio) {
            res.status(404).json({ message: 'Audio not found' });
        } else {
            res.set('Content-Type', 'audio/wav');
            res.send(resumeAudio.audio.buffer);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to get audio file', error: error.toString() });
    }
});

module.exports = router;
