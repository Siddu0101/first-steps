// File: /api/getAIResponse.js

import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  // Ensure the request is a POST request
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    // Get the user's message from the request body
    const { userInput } = req.body;
    
    // Check if the user input exists
    if (!userInput) {
      return res.status(400).json({ error: 'User input is required.' });
    }

    // Initialize the Gemini AI model with the secret API key from Vercel's environment variables
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Create a detailed prompt to guide the AI for better, more consistent responses
    const prompt = `
      You are "FirstSteps AI Mentor," an expert advisor for early-stage entrepreneurs. 
      Your tone should be encouraging, knowledgeable, and actionable. 
      Provide clear, concise advice based on the user's question. 
      Use formatting like lists and bold text (using markdown like **this**) to make your response easy to read.
      
      User's question: "${userInput}"
    `;

    // Call the Gemini API to generate content
    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    // Send the AI's plain text response back to the frontend
    res.status(200).json({ text: responseText });

  } catch (error) {
    // Handle any errors that occur during the process
    console.error('Gemini API Error:', error);
    res.status(500).json({ error: 'Failed to get a response from the AI mentor.' });
  }
}
