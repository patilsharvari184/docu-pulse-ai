import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MessageCircle, X, Send } from "lucide-react";
import { useApp } from "@/contexts/AppContext";
import { useToast } from "@/hooks/use-toast";

export const FloatingChat = () => {
  const { selectedDocument, addMessage } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const { toast } = useToast();

  const handleSend = () => {
    if (!message.trim()) return;
    
    if (!selectedDocument) {
      toast({
        title: "No document selected",
        description: "Please select a document from the sidebar first.",
        variant: "destructive"
      });
      return;
    }

    // Add user message
    addMessage({
      id: Date.now().toString(),
      type: "user",
      content: message,
      timestamp: new Date(),
      documentId: selectedDocument.id
    });

    // Simulate quick AI response
    setTimeout(() => {
      addMessage({
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content: "Thanks for your quick question! I'm analyzing the document to provide you with an accurate answer.",
        timestamp: new Date(),
        documentId: selectedDocument.id
      });
    }, 500);

    setMessage("");
    setIsOpen(false);
    
    toast({
      title: "Question sent",
      description: "Check the chat panel for the response.",
    });
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-purple shadow-xl hover:shadow-2xl transition-all duration-300 z-50"
        size="lg"
      >
        <MessageCircle className="w-6 h-6 text-white" />
      </Button>
    );
  }

  return (
    <Card className="fixed bottom-6 right-6 w-80 h-96 shadow-2xl z-50 animate-slide-up">
      <div className="flex items-center justify-between p-4 border-b border-neutral-200 bg-gradient-purple rounded-t-lg">
        <h3 className="font-semibold text-white">Quick Ask</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsOpen(false)}
          className="w-6 h-6 p-0 text-white hover:bg-white/20"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>
      
      <CardContent className="p-4 h-full flex flex-col">
        <div className="flex-1 mb-4">
          <p className="text-sm text-muted-foreground">
            {selectedDocument 
              ? `Ask a quick question about "${selectedDocument.name}".`
              : "Select a document first to ask questions."
            }
          </p>
        </div>
        
        <div className="relative">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={selectedDocument ? "What would you like to know?" : "Select a document first"}
            className="pr-12"
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          />
          <Button
            onClick={handleSend}
            disabled={!message.trim() || !selectedDocument}
            size="sm"
            className="absolute right-1 top-1 h-8 w-8 p-0"
          >
            <Send className="w-3 h-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};