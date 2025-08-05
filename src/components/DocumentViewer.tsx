import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ZoomIn,
  ZoomOut,
  RotateCw,
  Download,
  Share,
  ChevronLeft,
  ChevronRight,
  Maximize,
  FileText,
  Calendar
} from "lucide-react";
import sampleDocument from "@/assets/sample-document.jpg";

export const DocumentViewer = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [zoom, setZoom] = useState(100);
  const totalPages = 24;

  const handleZoomIn = () => setZoom(Math.min(zoom + 25, 200));
  const handleZoomOut = () => setZoom(Math.max(zoom - 25, 50));
  const handlePrevPage = () => setCurrentPage(Math.max(currentPage - 1, 1));
  const handleNextPage = () => setCurrentPage(Math.min(currentPage + 1, totalPages));

  return (
    <div className="flex-1 flex flex-col bg-neutral-100">
      {/* Document header */}
      <div className="bg-card border-b border-neutral-200 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-50 border border-red-200 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">
                Research Paper - AI in Healthcare.pdf
              </h2>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  Uploaded Jan 15, 2024
                </div>
                <Badge variant="secondary" className="bg-green-50 text-green-700 border-green-200">
                  Ready
                </Badge>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Share className="w-4 h-4 mr-2" />
              Share
            </Button>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-card border-b border-neutral-200 p-3">
        <div className="flex items-center justify-between">
          {/* Zoom controls */}
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleZoomOut}>
              <ZoomOut className="w-4 h-4" />
            </Button>
            <span className="text-sm font-medium min-w-[60px] text-center">
              {zoom}%
            </span>
            <Button variant="outline" size="sm" onClick={handleZoomIn}>
              <ZoomIn className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm">
              <RotateCw className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm">
              <Maximize className="w-4 h-4" />
            </Button>
          </div>

          {/* Page navigation */}
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handlePrevPage}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <div className="flex items-center gap-2 px-3">
              <span className="text-sm font-medium">
                Page {currentPage} of {totalPages}
              </span>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Document viewer */}
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-4xl mx-auto">
          {/* Page container */}
          <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-6">
            <div 
              className="relative"
              style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'top center' }}
            >
              <img 
                src={sampleDocument}
                alt={`Page ${currentPage}`}
                className="w-full h-auto block"
                style={{ maxWidth: '800px', margin: '0 auto' }}
              />
              
              {/* Highlight overlay example */}
              <div 
                className="absolute bg-yellow-200 bg-opacity-50 border-2 border-yellow-400 cursor-pointer hover:bg-opacity-70"
                style={{
                  top: '20%',
                  left: '10%', 
                  width: '40%',
                  height: '8%'
                }}
                title="Highlighted text about AI applications"
              />
            </div>
          </div>

          {/* Show second page in 2-page view */}
          {currentPage < totalPages && (
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <div 
                className="relative"
                style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'top center' }}
              >
                <img 
                  src={sampleDocument}
                  alt={`Page ${currentPage + 1}`}
                  className="w-full h-auto block opacity-90"
                  style={{ maxWidth: '800px', margin: '0 auto' }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};