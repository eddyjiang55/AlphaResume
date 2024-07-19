const express = require('express');
const router = express.Router();
const ResumeGuidance = require('../mongodb/models/ResumeGuidance');

router.post('/resume-guidance', async (req, res) => {
    try {
        const { position, guidance } = req.body;
        const resumeGuidance = new ResumeGuidance(position, guidance);
        const _id = await resumeGuidance.save();
        res.status(201).json({ message: 'Resume guidance created successfully', _id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to create resume guidance', error: error.toString() });
    }
});

router.get('/resume-guidance/:position', async (req, res) => {
    try {
        const position = req.params.position;
        const guidance = await ResumeGuidance.findByPosition(position);
        if (guidance) {
            res.status(200).json(guidance);
        } else {
            res.status(404).json({ message: 'Guidance not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to retrieve guidance.", error: error.toString() });
    }
});


// 删除 resumeGuidance 集合中的所有数据
router.delete('/resume-guidance', async (req, res) => {
    try {
        const result = await ResumeGuidance.deleteAll();
        res.status(200).json({ message: "All resume guidance records have been deleted", result });
    } catch (error) {
        console.error("Failed to delete all resume guidance records:", error);
        res.status(500).json({ message: "Failed to delete all resume guidance records", error: error.toString() });
    }
});
module.exports = router;
