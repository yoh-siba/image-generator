import { GoogleGenAI } from "@google/genai";
import * as fs from "node:fs";
import * as path from "node:path";

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

  const generatedImage = response.generatedImages[0];
  const imageBytes = generatedImage.image.imageBytes;
  const buffer = Buffer.from(imageBytes, "base64");
  
  const id = Date.now().toString();
  const publicDir = path.join(process.cwd(), "public", "generated");
  
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }
  
  const fileName = `image-${id}.png`;
  const filePath = path.join(publicDir, fileName);
  
  fs.writeFileSync(filePath, buffer);
  
  return {
    id,
    url: `/generated/${fileName}`,
    prompt,
    createdAt: new Date(),
  };
}