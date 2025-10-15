// api/getAIResponse.js

export default async function handler(req, res) {
  // Set headers to allow requests from any origin (CORS)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Vercel requires an OPTIONS response for preflight checks
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Ensure the request method is POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    // --- 1. Check for User Input ---
    const { userInput } = req.body;
    if (!userInput) {
      return res.status(400).json({ error: 'userInput is required in the request body.' });
    }

    // --- 2. Check for the API Key in Environment Variables ---
    const hfToken = process.env.HF_TOKEN;
    if (!hfToken) {
      // This error means the HF_TOKEN is not set in your Vercel project settings
      console.error('HF_TOKEN not found in environment variables.');
      return res.status(500).json({ error: 'API key is not configured on the server.' });
    }

    // --- 3. Call the Hugging Face API ---
    const response = await fetch('https://api-inference.huggingface.co/models/gpt2', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${hfToken}`, // Use the API key
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inputs: `You are a helpful startup mentor. A user asks: "${userInput}". Your concise and helpful answer is:`,
        parameters: {
          max_new_tokens: 70,       // Increased for better responses
          return_full_text: false,
          temperature: 0.7,       // Makes output more creative
        }
      }),
    });

    // --- 4. Handle API Response Errors ---
    if (!response.ok) {
      // This handles errors like 401 Unauthorized (bad key) or 503 Service Unavailable
      const errorDetails = await response.text();
      console.error(`Hugging Face API Error: ${response.status}`, errorDetails);
      return res.status(response.status).json({ error: `Hugging Face API error: ${response.status}` });
    }

    const data = await response.json();

    // --- 5. Extract and Send the AI-Generated Text ---
    const aiText = data[0]?.generated_text?.trim();

    if (!aiText) {
      // If the API returns a strange format, send a fallback message
      return res.status(500).json({ text: "Sorry, I received an unexpected response from the AI. Please try again." });
    }

    return res.status(200).json({ text: aiText });

  } catch (error) {
    // This catches general server errors (e.g., network issues)
    console.error('An unexpected error occurred:', error);
    return res.status(500).json({ error: 'An internal server error occurred.' });
  }
}
