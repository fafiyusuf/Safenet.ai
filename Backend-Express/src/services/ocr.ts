import sharp from 'sharp';
import Tesseract from 'tesseract.js';

export const extractTextFromImage = async (imageBuffer: Buffer, language: string = 'en'): Promise<string> => {
  try {
    // Preprocess image for better OCR
    const processedImage = await sharp(imageBuffer)
      .grayscale()
      .normalize()
      .sharpen()
      .toBuffer();

    // Determine Tesseract language
    const tessLang = language === 'am' ? 'amh+eng' : 'eng';

    // Perform OCR
    const { data: { text } } = await Tesseract.recognize(
      processedImage,
      tessLang,
      {
        logger: info => {
          if (process.env.LOG_LEVEL === 'debug') {
            console.log(info);
          }
        }
      }
    );

    return cleanExtractedText(text);
  } catch (error) {
    console.error('OCR Error:', error);
    return '[OCR extraction failed - please try again or enter text manually]';
  }
};

const cleanExtractedText = (text: string): string => {
  if (!text) return '';

  const lines = text.split('\n');
  const cleanedLines: string[] = [];

  for (const line of lines) {
    const trimmed = line.trim();
    
    if (!trimmed) continue;
    if (/^[|_\-=+*#@]+$/.test(trimmed)) continue;
    
    cleanedLines.push(trimmed);
  }

  let cleaned = cleanedLines.join('\n');
  
  while (cleaned.includes('  ')) {
    cleaned = cleaned.replace(/  /g, ' ');
  }

  return cleaned.trim();
};

export const detectLanguage = (text: string): string => {
  if (!text) return 'en';

  // Count Amharic Unicode characters (U+1200 to U+137F)
  const amharicChars = (text.match(/[\u1200-\u137F]/g) || []).length;
  const totalAlpha = (text.match(/[a-zA-Z\u1200-\u137F]/g) || []).length;

  if (totalAlpha === 0) return 'en';

  return (amharicChars / totalAlpha > 0.3) ? 'am' : 'en';
};
