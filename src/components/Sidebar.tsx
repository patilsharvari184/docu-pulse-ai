import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FileText,
  Search,
  CheckCircle,
  Clock,
  AlertTriangle,
  Upload,
  Calendar,
  HardDrive,
  ChevronDown
} from "lucide-react";

interface PDFDocument {
  id: string;
  name: string;
  uploadDate: string;
  status: 'completed' | 'processing' | 'error';
  size: string;
  pages: number;
}

export const Sidebar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("created");
  const [selectedDoc, setSelectedDoc] = useState("1");

  const documents: PDFDocument[] = [
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

  const getStatusIcon = (status: PDFDocument['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'processing':
        return <Clock className="w-4 h-4 text-blue-highlight animate-pulse-gentle" />;
      case 'error':
        return <AlertTriangle className="w-4 h-4 text-destructive" />;
    }
  };

  const getStatusBadge = (status: PDFDocument['status']) => {
    switch (status) {
      case 'completed':
        return <Badge variant="secondary" className="text-xs bg-green-50 text-green-700 border-green-200">Ready</Badge>;
      case 'processing':
        return <Badge variant="secondary" className="text-xs bg-blue-50 text-blue-700 border-blue-200">Processing</Badge>;
      case 'error':
        return <Badge variant="destructive" className="text-xs">Failed</Badge>;
    }
  };

  const filteredDocuments = documents.filter(doc =>
    doc.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-80 border-r border-neutral-200 bg-card flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-neutral-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">Documents</h2>
          <Button size="sm" className="bg-primary text-primary-foreground">
            <Upload className="w-4 h-4 mr-2" />
            Upload
          </Button>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search PDFs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-neutral-100 border-neutral-200 focus:bg-background"
          />
        </div>

        {/* Sort filter */}
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="bg-neutral-100 border-neutral-200">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="created">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Created Date
              </div>
            </SelectItem>
            <SelectItem value="name">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Name
              </div>
            </SelectItem>
            <SelectItem value="size">
              <div className="flex items-center gap-2">
                <HardDrive className="w-4 h-4" />
                File Size
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Document list */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-2">
          {filteredDocuments.map((doc) => (
            <div
              key={doc.id}
              onClick={() => setSelectedDoc(doc.id)}
              className={`p-3 rounded-lg cursor-pointer transition-all mb-2 ${
                selectedDoc === doc.id
                  ? "bg-purple-accent-light border border-primary shadow-md"
                  : "hover:bg-neutral-100 border border-transparent"
              }`}
            >
              <div className="flex items-start gap-3">
                {/* PDF Icon */}
                <div className="w-10 h-10 bg-red-50 border border-red-200 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FileText className="w-5 h-5 text-red-600" />
                </div>

                {/* Document info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-1">
                    <h3 className="text-sm font-medium text-foreground truncate pr-2">
                      {doc.name}
                    </h3>
                    {getStatusIcon(doc.status)}
                  </div>
                  
                  <div className="flex items-center gap-2 mb-2">
                    {getStatusBadge(doc.status)}
                    <span className="text-xs text-muted-foreground">
                      {doc.pages} pages
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{new Date(doc.uploadDate).toLocaleDateString()}</span>
                    <span>{doc.size}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer stats */}
      <div className="p-4 border-t border-neutral-200 bg-neutral-100">
        <div className="text-xs text-muted-foreground">
          <div className="flex justify-between mb-1">
            <span>Total documents:</span>
            <span className="font-medium">{documents.length}</span>
          </div>
          <div className="flex justify-between">
            <span>Storage used:</span>
            <span className="font-medium">14.7 MB</span>
          </div>
        </div>
      </div>
    </div>
  );
};