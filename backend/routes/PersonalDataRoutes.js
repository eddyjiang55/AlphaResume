const express = require('express');
const router = express.Router();

// 引入各个集合类
const PersonalEvaluation = require('../mongodb/models/PersonalEvaluation');
const EducationHistory = require('../mongodb/models/EducationExperience');
const ProfessionalExperience = require('../mongodb/models/ProfessionalExperience');
const ProjectExperience = require('../mongodb/models/ProjectExperience');
const AwardsAndCertificates = require('../mongodb/models/AwardsAndCertification');
const Skills = require('../mongodb/models/Skills');
const Languages = require('../mongodb/models/Languages');
const ResearchPapersAndPatents = require('../mongodb/models/ResearchPapersAndPatents');

// POST请求，保存数据到相应的集合
router.post('/save-data', async (req, res) => {
    const { type, account, data } = req.body;
    let response;
    
    try {
        switch(type) {
            case 'personalEvaluation':
                response = await new PersonalEvaluation(account, data).save();
                break;
            case 'educationHistory':
                response = await new EducationHistory(account, data).save();
                break;
            case 'professionalExperience':
                response = await new ProfessionalExperience(account, data).save();
                break;
            case 'projectExperience':
                response = await new ProjectExperience(account, data).save();
                break;
            case 'awardsAndCertificates':
                response = await new AwardsAndCertificates(account, data).save();
                break;
            case 'skills':
                response = await new Skills(account, data).save();
                break;
            case 'languages':
                response = await new Languages(account, data).save();
                break;
            case 'researchPapersAndPatents':
                response = await new ResearchPapersAndPatents(account, data).save();
                break;
            default:
                return res.status(400).json({ message: "Invalid type specified" });
        }
        res.status(201).json({ message: "Data saved successfully", _id: response });
    } catch (error) {
        res.status(500).json({ message: "Failed to save data", error: error.toString() });
    }
});

module.exports = router;
