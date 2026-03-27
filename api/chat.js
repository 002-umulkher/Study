export default async function handler(req, res) {
  const { message } = req.body;
  const apiKey = process.env.API_KEY; // This pulls from your Vercel settings!

  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
    method: 'POST',
    body: JSON.stringify({ contents: [{ parts: [{ text: message }] }] })
  });

  const data = await response.json();
  res.status(200).json(data);
}