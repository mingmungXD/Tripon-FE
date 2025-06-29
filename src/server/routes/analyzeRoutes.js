const express = require('express');
const router = express.Router();
const multer = require('multer');
const analyzeController = require('../controllers/analyzeController');

const upload = multer(); // 이미지 업로드 처리 미들웨어

// 클라이언트가 POST로 /api/analyze 에 사진을 보내면,
// multer로 이미지를 받dktj → analyzeController.analyze 함수 실행
router.post('/', upload.any(), analyzeController.analyze);

module.exports = router;
