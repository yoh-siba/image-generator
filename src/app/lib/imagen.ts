import { GoogleGenAI } from "@google/genai";

export interface GeneratedImage {
  id: string;
  url: string;
  prompt: string;
  createdAt: Date;
}

export async function generateImage(prompt: string): Promise<GeneratedImage> {
  const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY || "" });

  const response = await ai.models.generateImages({
    model: "imagen-4.0-generate-preview-06-06",
    prompt: prompt,
    config: {
      numberOfImages: 1,
    },
  });

  if (!response.generatedImages || response.generatedImages.length === 0) {
    throw new Error("No images were generated");
  }
  
  const generatedImage = response.generatedImages[0];
  if (!generatedImage.image) {
    throw new Error("Generated image data is missing");
  }
  const imageBytes = generatedImage.image.imageBytes;
  if (!imageBytes) {
    throw new Error("Image bytes are missing");
  }
  
  const id = Date.now().toString();
  const dataUrl = `data:image/png;base64,${imageBytes}`;
  
  return {
    id,
    url: dataUrl,
    prompt,
    createdAt: new Date(),
  };
}