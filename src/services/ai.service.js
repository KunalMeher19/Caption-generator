const { GoogleGenAI } = require("@google/genai");

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({
    apiKey: "AIzaSyCH-E-y0k03K-fD3nk8bkdqkgZx0D9R3GA"
});

async function generateCaption(base64ImageFile) {
    const contents = [
        {
            inlineData: {
                mimeType: "image/jpeg",
                data: base64ImageFile,
            },
        },
        { text: "Caption this image." },
    ];

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: contents,
        config:{
            systemInstruction:`
                You are an expert in generating captions for images.
                You generate single caption for the image.
                Your caption should be short and concise.
                You use hashtags and emojis in the caption.
                You generate captions related to the current trend.
                The caption can be in dark humor. 
            `
        }
    });
    
    return response.text;
}

module.exports = generateCaption;