import axios from 'axios';

const HEYGEN_API_KEY = process.env.HEYGEN_API_KEY;
const HEYGEN_BASE_URL = 'https://api.heygen.com/v1';

if (!HEYGEN_API_KEY) {
  throw new Error('Missing HEYGEN_API_KEY');
}

const heygenClient = axios.create({
  baseURL: HEYGEN_BASE_URL,
  headers: {
    'X-Api-Key': HEYGEN_API_KEY,
    'Content-Type': 'application/json',
  },
});

export interface GenerateVideoRequest {
  script: string;
  avatarId?: string;
  voiceId?: string;
  title?: string;
}

export interface GenerateVideoResponse {
  video_id: string;
  status: string;
  created_at: string;
}

export async function generateVideo(request: GenerateVideoRequest) {
  try {
    const response = await heygenClient.post<GenerateVideoResponse>(
      '/generate',
      {
        script: request.script,
        avatar_id: request.avatarId || 'default',
        voice_id: request.voiceId || 'en_default',
        title: request.title,
      }
    );

    return response.data;
  } catch (error) {
    console.error('HeyGen API error:', error);
    throw error;
  }
}

export async function getVideoStatus(videoId: string) {
  try {
    const response = await heygenClient.get(`/video/${videoId}`);
    return response.data;
  } catch (error) {
    console.error('HeyGen API error:', error);
    throw error;
  }
}

export async function getVideoDownloadUrl(videoId: string) {
  try {
    const response = await heygenClient.get(`/video/${videoId}/download`);
    return response.data.download_url;
  } catch (error) {
    console.error('HeyGen API error:', error);
    throw error;
  }
}

export function generateScript(
  prospectName: string,
  prospectCompany: string,
  customMessage: string
): string {
  return `
Hello ${prospectName},

I came across your profile and ${prospectCompany} caught my attention. 

${customMessage}

I'd love to connect and explore how we can work together.

Looking forward to hearing from you!
  `.trim();
}
