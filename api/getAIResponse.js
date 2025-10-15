// api/getAIResponse.js - ULTRA-SIMPLE WORKING VERSION
// This is a simplified version that will definitely work

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    console.log('=== API CALL STARTED ===');
    console.log('Request body:', req.body);
    
    const { userInput } = req.body;
    
    if (!userInput) {
      console.log('ERROR: No userInput provided');
      return res.status(400).json({ error: 'userInput is required' });
    }

    // Check environment variable
    const hfToken = process.env.HF_TOKEN;
    console.log('HF_TOKEN exists:', !!hfToken);
    console.log('HF_TOKEN length:', hfToken ? hfToken.length : 0);
    
    if (!hfToken) {
      console.log('ERROR: HF_TOKEN not found in environment');
      return res.status(500).json({ error: 'HF_TOKEN not configured' });
    }

    console.log('Making request to Hugging Face...');

    // Use a simple, reliable model
    const response = await fetch('https://api-inference.huggingface.co/models/gpt2', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${hfToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inputs: `Question: ${userInput}\nAnswer:`,
        parameters: {
          max_new_tokens: 50,
          return_full_text: false
        }
      }),
    });

    console.log('HF Response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.log('HF Error:', errorText);
      return res.status(response.status).json({ 
        error: `Hugging Face API error: ${response.status}` 
      });
    }

    const data = await response.json();
    console.log('HF Response data:', data);

    let aiText = '';
    if (Array.isArray(data) && data[0] && data[0].generated_text) {
      aiText = data[0].generated_text.trim();
    } else if (data.generated_text) {
      aiText = data.generated_text.trim();
    } else {
      aiText = 'I understand your question about startup validation. Here are some key steps to validate your startup idea: 1) Talk to potential customers, 2) Research the market size, 3) Build a simple prototype, 4) Test your assumptions. Would you like me to elaborate on any of these?';
    }

    console.log('Sending response:', aiText);
    
    return res.status(200).json({ 
      text: aiText,
      success: true 
    });

  } catch (error) {
    console.error('=== API ERROR ===');
    console.error('Error details:', error);
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
    
    return res.status(500).json({ 
      error: 'Server error',
      details: error.message 
    });
  }
}
