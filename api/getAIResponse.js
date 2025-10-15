export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { userInput } = req.body;
    if (!userInput) {
      return res.status(400).json({ error: 'User input is required.' });
    }

    // SWITCHING to a more reliable model for the free tier
    const model = "microsoft/DialoGPT-medium";
    
    const hfResponse = await fetch(
      `https://api-inference.huggingface.co/models/${model}`,
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.HF_TOKEN}`
        },
        method: 'POST',
        body: JSON.stringify({
          inputs: {
            // This model works best with past user inputs to build context
            past_user_inputs: ["Hello, I need some startup advice."],
            generated_responses: ["Of course, I'm here to help. What's on your mind?"],
            text: userInput
          },
          parameters: {
            return_full_text: false
          }
        }),
      }
    );

    if (!hfResponse.ok) {
      const errorText = await hfResponse.text();
      console.error('Hugging Face API Error:', errorText);
      if (hfResponse.status === 503) {
        return res.status(503).json({ error: 'The AI model is currently loading, please try again in a moment.' });
      }
      return res.status(500).json({ error: `Failed to get a response from the AI mentor. Details: ${errorText}` });
    }

    const responseData = await hfResponse.json();
    const responseText = responseData.generated_text || "Sorry, I couldn't generate a response.";

    res.status(200).json({ text: responseText });

  } catch (error) {
    console.error('Server Error:', error);
    res.status(500).json({ error: 'Failed to get a response from the AI mentor.' });
  }
}
