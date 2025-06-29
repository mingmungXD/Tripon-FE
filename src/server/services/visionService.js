const axios = require('axios');

exports.describeImage = async (base64Image) => {
  const API_KEY = process.env.GOOGLE_API_KEY;
  const response = await axios.post(
    `https://vision.googleapis.com/v1/images:annotate?key=${API_KEY}`,
    {
      requests: [
        {
          image: { content: base64Image },
          features: [{ type: "LABEL_DETECTION", maxResults: 5 }],
        },
      ],
    }
  );

  const labels = response.data.responses[0].labelAnnotations;
  return labels.map(l => l.description).join(', ');
};