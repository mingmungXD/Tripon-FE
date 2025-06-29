const { OpenAI } = require('openai');
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

exports.analyzePersonalityFromImages = async (imageDescriptions) => {
  const prompt = `
이 사람의 성격과 여행 스타일을 감성적으로 분석해줘.
칭찬은 예쁘게, 단점은 뼈 때리게 말해줘.
10줄 내외로 작성해줘.

${imageDescriptions.map((desc, i) => `${i + 1}. ${desc}`).join('\n')}

형식:
제목: ~
설명: ~
`;

  const res = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [{ role: 'user', content: prompt }],
  });

  const content = res.choices[0].message.content;
  const match = content.match(/제목:\s*(.+)\n설명:\s*(.+)/s);

  return {
    title: match?.[1]?.trim() || '분석 실패',
    description: match?.[2]?.trim() || content.trim(),
  };
};
