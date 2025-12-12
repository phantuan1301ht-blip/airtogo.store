import { GoogleGenAI } from "@google/genai";

const fileToGenerativePart = async (file: File): Promise<{ inlineData: { data: string; mimeType: string } }> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      // Extract the base64 part, removing "data:image/jpeg;base64,"
      const base64Data = base64String.split(',')[1];
      resolve({
        inlineData: {
          data: base64Data,
          mimeType: file.type,
        },
      });
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export const generateSEOContent = async (description: string, imageFile: File | null, language: string): Promise<string> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    // Using gemini-2.5-flash for speed and multimodal capabilities
    const modelId = 'gemini-2.5-flash';

    const parts: any[] = [];

    // Add image if present and has content
    if (imageFile && imageFile.size > 0) {
      const imagePart = await fileToGenerativePart(imageFile);
      parts.push(imagePart);
    }

    // Calculate current time context
    const now = new Date();
    const currentMonth = now.getMonth() + 1;
    const currentYear = now.getFullYear();
    const timeString = `${currentMonth}/${currentYear}`;

    // Construct the prompt
    const prompt = `
      You are a Top-Tier E-commerce Optimization Expert (Specializing in Shopee, Lazada, TikTok Shop, Amazon).
      
      CONTEXT: ${timeString}.
      TARGET LANGUAGE: ${language}
      
      CORE TASK: Create a "High-Converting E-commerce Product Listing" based on the input image and description.

      INPUT DATA:
      - User Description: "${description}"
      - Image Analysis: (Perform a detailed visual inspection of the product image to identify color, material, shape, and likely usage).

      STRICT LANGUAGE RULE: 
      - The output MUST be 100% in ${language}. 
      - You MUST translate ALL headings, subheadings, labels, and bullet points into ${language}. 
      - Do NOT leave English headers like "Product Specifications" or "Key Highlights" unless the target language is English.
      - Only keep Brand Names or Technical Terms in English if that is standard in ${language}.

      STRICT E-COMMERCE SEO GUIDELINES:

      1. **Product Title Optimization (Critical):**
         - Formula: [Brand/Keyword] + [Product Name] + [USP/Key Feature] + [Model/Size/Color].
         - Must be readable but keyword-rich (Max 120 chars).

      2. **Structure for Marketplace Algorithms:**
         - **Bullet Points:** Use emoticons (✅, ⭐, 🔥, 🚀).
         - **Formatting:** Use bolding for key benefits.

      3. **Tone of Voice:**
         - Adapt the tone to fit the cultural norms of ${language}.
         - For Vietnamese: Exciting, Trustworthy, "Bắt trend".
         - For English: Professional, Benefit-driven.

      PLEASE RETURN THE RESULT IN THE FOLLOWING MARKDOWN FORMAT (Translated entirely to ${language}):

      ---
      ### [Translate: E-COMMERCE LISTING OPTIMIZATION]

      # [Product Title: Use the Formula Brand + Keyword + USP + Specs]

      **[Translate: SEO Tips]:** *[Explain why this title works in ${language}]*

      ---

      ### 📋 1. [Translate: PRODUCT SPECIFICATIONS]
      (Extract or estimate these. Use a list format.)
      *   **[Translate: Material]:** ...
      *   **[Translate: Color/Size]:** ...
      *   **[Translate: Origin/Brand]:** ...
      *   **[Translate: Key Tech]:** ...

      ### 🔥 2. [Translate: KEY HIGHLIGHTS]
      (Use bullet points with relevant emojis)
      *   ✅ **[Translate: Benefit 1]:** [Explanation in ${language}]
      *   ✅ **[Translate: Benefit 2]:** [Explanation in ${language}]
      *   ✅ **[Translate: Benefit 3]:** [Explanation in ${language}]
      *   🚀 **[Translate: USP]:** [The main reason to buy in ${language}]

      ### 📝 3. [Translate: DETAILED DESCRIPTION]
      **[Opening Hook]**
      (A short paragraph in ${language} introducing the product.)

      **[Body Paragraphs]**
      (Elaborate on features in ${language}.)

      ### 📖 4. [Translate: USER MANUAL]
      *   [Step 1 in ${language}]
      *   [Step 2 in ${language}]

      ### 🛡️ 5. [Translate: SHOP COMMITMENT & WARRANTY]
      *   ⭐ [Commitment 1 in ${language}]
      *   ⭐ [Warranty policy in ${language}]
      *   ⭐ [Shipping info in ${language}]

      ### 🏷️ 6. HASHTAGS
      #[Keyword1] #[Keyword2] #[TrendingKeyword] #[BrandName]

      ---
      
      ### 🤖 [Translate: GOOGLE SEO METADATA]
      *   **Meta Title:** [Short title < 60 chars in ${language}]
      *   **Meta Description:** [Attractive snippet < 160 chars in ${language}]
      *   **Image Alt Text:** [Descriptive text for the image in ${language}]
    `;

    parts.push({ text: prompt });

    const response = await ai.models.generateContent({
      model: modelId,
      contents: { parts },
    });

    return response.text || "Could not generate content. Please try again.";
  } catch (error) {
    console.error("Error generating SEO content:", error);
    throw new Error("An error occurred while generating content. Please check your API Key or try again later.");
  }
};