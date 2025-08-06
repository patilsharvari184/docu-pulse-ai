import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface PDFDocument {
  id: string;
  name: string;
  uploadDate: string;
  status: 'completed' | 'processing' | 'error';
  size: string;
  pages: number;
  url?: string;
}

export interface ChatMessage {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  citations?: string[];
  tableReference?: boolean;
  timestamp: Date;
  documentId?: string;
}

interface AppContextType {
  documents: PDFDocument[];
  selectedDocument: PDFDocument | null;
  messages: ChatMessage[];
  currentPage: number;
  zoom: number;
  isUploading: boolean;
  setDocuments: React.Dispatch<React.SetStateAction<PDFDocument[]>>;
  setSelectedDocument: (doc: PDFDocument | null) => void;
  setMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
  setCurrentPage: (page: number) => void;
  setZoom: (zoom: number) => void;
  setIsUploading: (uploading: boolean) => void;
  addMessage: (message: ChatMessage) => void;
  uploadDocument: (file: File) => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const initialDocuments: PDFDocument[] = [
  {
    id: "1",
    name: "Research Paper - AI in Healthcare.pdf",
    uploadDate: "2024-01-15",
    status: "completed",
    size: "2.4 MB",
    pages: 24
  },
  {
    id: "2", 
    name: "Financial Report Q3 2023.pdf",
    uploadDate: "2024-01-14",
    status: "completed",
    size: "1.8 MB",
    pages: 18
  },
  {
    id: "3",
    name: "Technical Documentation.pdf", 
    uploadDate: "2024-01-13",
    status: "processing",
    size: "5.2 MB",
    pages: 45
  },
  {
    id: "4",
    name: "Business Plan 2024.pdf",
    uploadDate: "2024-01-12", 
    status: "error",
    size: "3.1 MB",
    pages: 32
  },
  {
    id: "5",
    name: "User Manual v2.1.pdf",
    uploadDate: "2024-01-11",
    status: "completed", 
    size: "1.2 MB",
    pages: 12
  }
];

const initialMessages: ChatMessage[] = [
  {
    id: "1",
    type: "assistant",
    content: "Hello! I'm ready to help you analyze your PDF documents. Select a document from the sidebar and ask me anything about it.",
    timestamp: new Date()
  }
];

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [documents, setDocuments] = useState<PDFDocument[]>(initialDocuments);
  const [selectedDocument, setSelectedDocumentState] = useState<PDFDocument | null>(initialDocuments[0]);
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [currentPage, setCurrentPage] = useState(1);
  const [zoom, setZoom] = useState(100);
  const [isUploading, setIsUploading] = useState(false);

  const setSelectedDocument = (doc: PDFDocument | null) => {
    setSelectedDocumentState(doc);
    setCurrentPage(1);
    // Clear messages when switching documents
    if (doc) {
      setMessages([
        {
          id: Date.now().toString(),
          type: "assistant",
          content: `I'm ready to help you analyze "${doc.name}". Ask me anything about this document.`,
          timestamp: new Date(),
          documentId: doc.id
        }
      ]);
    }
  };

  const addMessage = (message: ChatMessage) => {
    setMessages(prev => [...prev, message]);
  };

  const uploadDocument = async (file: File): Promise<void> => {
    setIsUploading(true);
    
    // Simulate upload process
    const newDoc: PDFDocument = {
      id: Date.now().toString(),
      name: file.name,
      uploadDate: new Date().toISOString().split('T')[0],
      status: 'processing',
      size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
      pages: Math.floor(Math.random() * 50) + 10 // Random page count for demo
    };

    setDocuments(prev => [newDoc, ...prev]);
    
    // Simulate processing time
    setTimeout(() => {
      setDocuments(prev => 
        prev.map(doc => 
          doc.id === newDoc.id 
            ? { ...doc, status: 'completed' as const }
            : doc
        )
      );
      setIsUploading(false);
    }, 3000);
  };

  const value: AppContextType = {
    documents,
    selectedDocument,
    messages,
    currentPage,
    zoom,
    isUploading,
    setDocuments,
    setSelectedDocument,
    setMessages,
    setCurrentPage,
    setZoom,
    setIsUploading,
    addMessage,
    uploadDocument
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};