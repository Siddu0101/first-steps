export default async function handler(req, res) {
  // Ensure the request is a POST request
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { userInput } = req.body;
    if (!userInput) {
      return res.status(400).json({ error: 'User input is required.' });
    }

    // The Hugging Face model we'll use for free
    const model = "google/gemma-2b-it";
    
    // Create the prompt
    const prompt = `You are "FirstSteps AI Mentor," an expert advisor for early-stage entrepreneurs. Your tone should be encouraging, knowledgeable, and actionable. Provide a clear, concise answer to the user's question.\n\nUser's question: "${userInput}"\n\nAI Mentor's answer:`;

    // Call the Hugging Face Inference API
    const hfResponse = await fetch(
      `https://api-inference.huggingface.co/models/${model}`,
      {
        headers: {
          "Content-Type": "application/json",
          // Use the new environment variable for the Hugging Face token
          "Authorization": `Bearer ${process.env.HF_TOKEN}`
        },
        method: 'POST',
        body: JSON.stringify({ 
            inputs: prompt,
            parameters: {
                max_new_tokens: 250, // Limit the response length
                return_full_text: false // Only return the AI's answer
            }
        }),
      }
    );

    if (!hfResponse.ok) {
        const errorText = await hfResponse.text();
        console.error('Hugging Face API Error:', errorText);
        // If the model is loading, it's a common, temporary issue.
        if (hfResponse.status === 503) {
            return res.status(503).json({ error: 'The AI model is currently loading, please try again in a moment.' });
        }
        return res.status(500).json({ error: `Failed to get a response from the AI mentor. Details: ${errorText}` });
    }

    const responseData = await hfResponse.json();
    
    // The response text is inside generated_text
    const responseText = responseData[0]?.generated_text || "Sorry, I couldn't generate a response.";

    // Send the response back to the frontend
    res.status(200).json({ text: responseText });

  } catch (error) {
    console.error('Server Error:', error);
    res.status(500).json({ error: 'Failed to get a response from the AI mentor.' });
  }
}
