import { GoogleGenAI, Type } from "@google/genai";
import { Tool } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Uses Gemini to interpret a natural language query and return IDs of tools that are relevant.
 */
export const searchToolsWithAI = async (query: string, availableTools: Tool[]): Promise<string[]> => {
  try {
    // Create a simplified map of tools to save context window tokens, although current limits are high.
    const toolsContext = availableTools.map(t => ({
      id: t.id,
      name: t.name,
      description: t.description,
      tags: t.tags
    }));

    const prompt = `
      You are an intelligent search assistant for a directory of web tools.
      User Query: "${query}"

      Here is the list of available tools:
      ${JSON.stringify(toolsContext)}

      Task: Identify which tools from the list best match the user's intent. 
      Return ONLY a JSON object containing an array of 'matchedIds'.
      If no tools strongly match, try to find loosely related ones.
      
      Example Output:
      {
        "matchedIds": ["1", "5"]
      }
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            matchedIds: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          }
        }
      }
    });

    const result = JSON.parse(response.text || '{}');
    return result.matchedIds || [];
  } catch (error) {
    console.error("Gemini Search Error:", error);
    return []; // Fallback to empty which app handles as "no AI results" or fallback to standard search
  }
};
