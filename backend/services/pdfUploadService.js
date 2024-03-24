// services/pdfUploadService.js
const multer = require('multer');
const { MongoClient, GridFSBucket } = require('mongodb');
const fs = require('fs');
const path = require('path');

const dbUrl = 'mongodb://localhost:27017';
const dbName = 'airesumedb';
const bucketName = 'pdfs'; // GridFS bucket name

// 设置multer存储
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // 临时存储位置
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// 连接到MongoDB并创建GridFSBucket实例
async function createGridFSBucket() {
    const client = new MongoClient(dbUrl);
    await client.connect();
    const db = client.db(dbName);
    return new GridFSBucket(db, { bucketName: bucketName });
}

// 上传PDF到GridFS
async function uploadPDFToGridFS(req, res) {
    const bucket = await createGridFSBucket();

    // 假设使用multer处理了上传，文件保存在req.file.path
    const uploadStream = bucket.openUploadStream(req.file.filename);
    fs.createReadStream(req.file.path).pipe(uploadStream)
        .on('error', (error) => {
            console.error('Upload to GridFS failed:', error);
            res.status(500).send('Upload failed');
        })
        .on('finish', () => {
            console.log('Upload to GridFS successful');
            res.send('Upload successful');
        });
}

module.exports = { upload, uploadPDFToGridFS };
