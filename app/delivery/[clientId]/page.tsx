import { Lock, Download, Share2, Play } from "lucide-react";

export default function ClientDelivery({ params }: { params: { clientId: string } }) {
  // Mock Data: In real app, fetch from Supabase/Drive based on clientId
  const clientName = params.clientId.replace('-', ' ').toUpperCase();
  
  return (
    <div className="min-h-screen bg-black text-white relative">
      {/* Immersive Background Blur of the video */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80" 
          alt="background blur" 
          className="w-full h-full object-cover opacity-20 blur-3xl saturate-150"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/60 to-black"></div>
      </div>

      <div className="relative z-10 pt-32 pb-24 px-6 min-h-screen flex flex-col justify-center">
        <div className="container mx-auto max-w-6xl">
          
          <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 animate-fade-in-up">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 mb-4 text-xs font-medium text-neutral-300">
                <Lock className="w-3 h-3 text-accent" /> Private Client Screen
              </div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-2 uppercase break-words">{clientName}</h1>
              <p className="text-neutral-400">Final Deliverables • Studio24 Review Room</p>
            </div>
            
            <div className="flex gap-4">
              <button className="flex items-center gap-2 px-6 py-3 rounded-full glass hover:bg-white/10 transition-colors text-sm font-medium">
                <Share2 className="w-4 h-4" /> Share Link
              </button>
              <button className="flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black hover:bg-neutral-200 transition-colors text-sm font-medium">
                <Download className="w-4 h-4" /> Download 4K
              </button>
            </div>
          </div>

          <div className="w-full rounded-2xl overflow-hidden glass border border-white/10 shadow-[0_0_100px_rgba(37,99,235,0.15)] animate-fade-in-up">
            {/* 16:9 Video Player Container */}
            <div className="relative w-full aspect-[16/9] bg-neutral-900 group">
              {/* For template: Placeholder Drive Embed / Video */}
              <video 
                className="w-full h-full object-cover"
                poster="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80"
                controls
              >
                <source src="https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4" type="video/mp4" />
              </video>
              
              {/* Premium Custom Player Overlay (hidden on play, shown on pause - simulated here visually) */}
              {/* In a real app with Drive Embed, the iframe takes this space */}
            </div>
            
            {/* File Info Bar */}
            <div className="px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-4 bg-black/40 backdrop-blur-md">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                  <Play className="w-4 h-4 fill-white text-white ml-1" />
                </div>
                <div>
                  <h3 className="text-sm font-bold">MAIN_HIGHLIGHT_FINAL_V2.mp4</h3>
                  <p className="text-xs text-neutral-500">Duration: 02:45 • Size: 845 MB</p>
                </div>
              </div>
              
              <div className="text-sm text-neutral-400">
                Uploaded: Today at 10:42 AM
              </div>
            </div>
          </div>

          {/* Feedback/Approval Section */}
          <div className="mt-12 text-center animate-fade-in-up" style={{ animationDelay: "200ms" }}>
            <h3 className="text-xl font-medium mb-6">Are you satisfied with the final cut?</h3>
            <div className="flex justify-center gap-4">
              <button className="px-8 py-4 rounded-xl bg-gradient-to-r from-accent to-blue-500 font-bold hover:shadow-[0_0_30px_rgba(37,99,235,0.4)] transition-all">
                Approve & Complete Project
              </button>
              <button className="px-8 py-4 rounded-xl glass hover:bg-white/5 font-bold transition-all">
                Request Revisions
              </button>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
