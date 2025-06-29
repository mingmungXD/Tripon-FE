const visionService = require('../services/visionService');
const openaiService = require('../services/openaiService');

exports.analyze = async (req, res) => {
  try {
    const imageDescriptions = [];

    for (const file of req.files) {
      const base64 = file.buffer.toString('base64');
      const description = await visionService.describeImage(base64);
      imageDescriptions.push(description);
    }

    const result = await openaiService.analyzePersonalityFromImages(imageDescriptions);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: '분석 실패' });
  }
};
