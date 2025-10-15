// Fixed getAIResponse API endpoint for Vercel deployment
export default async function handler(req, res) {
  // CORS headers for browser requests
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { userInput } = req.body;

    // Validate user input
    if (!userInput || typeof userInput !== 'string' || userInput.trim().length === 0) {
      return res.status(400).json({ error: 'User input is required and must be a non-empty string.' });
    }

    // Check if API key is available
    if (!process.env.HF_TOKEN) {
      console.error('HF_TOKEN environment variable is not set');
      return res.status(500).json({ error: 'API configuration error. Please contact support.' });
    }

    console.log('Making request to Hugging Face API...');

    // Call the Hugging Face API with better model and parameters
    const hfResponse = await fetch(
      "https://api-inference.huggingface.co/models/microsoft/DialoGPT-large", // Better conversational model
      {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.HF_TOKEN}`
        },
        body: JSON.stringify({
          inputs: `As an AI business mentor, provide helpful startup advice for: ${userInput}`,
          parameters: {
            max_new_tokens: 150,
            temperature: 0.7,
            do_sample: true,
            return_full_text: false
          }
        }),
      }
    );

    // Handle API errors from Hugging Face
    if (!hfResponse.ok) {
      const errorText = await hfResponse.text();
      console.error('Hugging Face API Error:', hfResponse.status, errorText);
      
      // Handle specific error cases
      if (hfResponse.status === 503) {
        return res.status(503).json({ 
          error: 'The AI model is currently loading. Please try again in a few moments.' 
        });
      } else if (hfResponse.status === 401) {
        return res.status(500).json({ 
          error: 'API authentication failed. Please contact support.' 
        });
      } else {
        return res.status(hfResponse.status).json({ 
          error: `The AI service encountered an issue: ${errorText}` 
        });
      }
    }

    // Process successful response
    const responseData = await hfResponse.json();
    console.log('Hugging Face API Response:', responseData);

    let responseText;
    
    // Handle different response formats
    if (Array.isArray(responseData) && responseData.length > 0) {
      responseText = responseData[0]?.generated_text?.trim() || 
                    responseData[0]?.text?.trim() ||
                    "I understand you're asking about startup advice. Could you provide more specific details about your business idea or challenge?";
    } else if (responseData.generated_text) {
      responseText = responseData.generated_text.trim();
    } else {
      responseText = "I'm here to help with your startup questions. Could you please rephrase your question?";
    }

    // Clean up response if needed
    if (responseText.length === 0) {
      responseText = "I'd be happy to help with your startup question. Could you provide more details about what specific guidance you're looking for?";
    }

    // Return successful response
    res.status(200).json({ 
      text: responseText,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    // Handle any server errors
    console.error('Server execution error:', error);
    res.status(500).json({ 
      error: 'The server encountered an unexpected error. Please try again later.',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}
