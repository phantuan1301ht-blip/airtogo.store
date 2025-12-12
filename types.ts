export interface SEOContentRequest {
  description: string;
  imageFile: File | null;
}

export interface GeneratedContent {
  rawText: string;
}

export interface ImagePreview {
  url: string;
  type: string;
}