export interface ImageRecord {
  id: string;
  prompt: string;
  url: string;
  inputImageUrl?: string;
  mode: 'text' | 'edit';
  size: string;
  createdAt: string;
}
