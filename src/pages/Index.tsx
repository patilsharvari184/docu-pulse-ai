import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { DocumentViewer } from "@/components/DocumentViewer";
import { ChatPanel } from "@/components/ChatPanel";
import { FloatingChat } from "@/components/FloatingChat";

const Index = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <div className="flex-1 flex overflow-hidden">
        <Sidebar />
        <DocumentViewer />
        <ChatPanel />
      </div>
      
      <FloatingChat />
    </div>
  );
};

export default Index;
