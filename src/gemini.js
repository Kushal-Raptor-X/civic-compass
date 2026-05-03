import { GoogleGenerativeAI } from '@google/generative-ai';

/**
 * Sanitize user input before sending to the API.
 * - Trims whitespace
 * - Strips HTML tags
 * - Truncates to 500 characters
 * @param {string} text
 * @returns {string}
 */
export function sanitizeInput(text) {
  if (typeof text !== 'string') return '';
  return text
    .trim()
    .replace(/<[^>]*>/g, '')
    .slice(0, 500);
}

/**
 * Ask Google Gemini a question scoped to a specific election step.
 * @param {string} stepTitle - The title of the current step for context.
 * @param {string} userQuestion - The user's raw question text.
 * @returns {Promise<string>} The AI-generated answer or a fallback message.
 */
export async function askGemini(stepTitle, userQuestion) {
  const FALLBACK =
    'Sorry, I couldn\'t get an answer right now. Please try again later or consult your local election office for help.';

  try {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (!apiKey) {
      return FALLBACK;
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    const systemPrompt = `You are Civic Compass, a friendly election education assistant. Answer ONLY questions about the election step: ${stepTitle}. Keep answers under 100 words. Be clear and neutral.`;

    const sanitized = sanitizeInput(userQuestion);
    if (!sanitized) {
      return 'Please enter a question to get started.';
    }

    const result = await model.generateContent({
      contents: [
        {
          role: 'user',
          parts: [{ text: `${systemPrompt}\n\nUser question: ${sanitized}` }],
        },
      ],
    });

    const response = result.response;
    const text = response.text();
    return text || FALLBACK;
  } catch {
    return FALLBACK;
  }
}
