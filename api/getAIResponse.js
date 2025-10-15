export default async function handler(req, res) {
  // 1. Basic validation
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { userInput } = req.body;
    if (!userInput) {
      return res.status(400).json({ error: 'User input is required.' });
    }

    // 2. Call the Hugging Face API
    const hfResponse = await fetch(
      "https://api-inference.huggingface.co/models/distilgpt2", // Using a fast, reliable model
      {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          // Use the secret token from Vercel's environment variables
          "Authorization": `Bearer ${process.env.HF_TOKEN}`
        },
        body: JSON.stringify({
          inputs: `Question: ${userInput}\nAnswer:`, // A simple, effective prompt
          parameters: {
            max_new_tokens: 100, // Limit the response length
            return_full_text: false
          }
        }),
      }
    );

    // 3. Handle errors from Hugging Face
    if (!hfResponse.ok) {
      const errorText = await hfResponse.text();
      console.error('Hugging Face API Error:', errorText);
      // Send a clear error message to the frontend
      return res.status(hfResponse.status).json({ error: `The AI model failed. Details: ${errorText}` });
    }

    // 4. Send the successful response back to the frontend
    const responseData = await hfResponse.json();
    const responseText = responseData[0]?.generated_text.trim() || "I'm sorry, I couldn't think of a response.";

    res.status(200).json({ text: responseText });

  } catch (error) {
    // Handle any other server crashes
    console.error('Server execution error:', error);
    res.status(500).json({ error: 'The server encountered an unexpected error.' });
  }
}
