import axios from 'axios';

const API_BASE_URL = 'https://7cf211b7f45c.ngrok-free.app';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': 'true'
  }
});

export interface UploadResponse {
  message: string;
  document_ids: string[];
}

export interface ExternalLinkResponse {
  message: string;
  document_id: string;
}

export interface AskResponse {
  answer: string;
  citations: {
    page: number;
    source: string;
    text: string;
  }[];
}

export const uploadPDFs = async (files: File[]): Promise<UploadResponse> => {
  const formData = new FormData();
  files.forEach(file => {
    formData.append('files', file);
  });

  const response = await api.post('/document/process-multiple-pdfs/', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    }
  });

  return response.data;
};

export const processExternalLink = async (link: string): Promise<ExternalLinkResponse> => {
  const response = await api.post('/document/process-external-link/', { link });
  return response.data;
};

export const askQuestion = async (question: string, documentIds: string[]): Promise<AskResponse> => {
  const response = await api.post('/document/ask', {
    question,
    document_ids: documentIds
  });
  return response.data;
};