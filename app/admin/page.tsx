import { UploadCloud, FolderLock, FileVideo, Save, Database, ArrowRight } from "lucide-react";
import { uploadToDrive, addYouTubeLinkToDrive } from "@/lib/drive";
import { saveMediaMetadata } from "@/lib/supabase";

export default function AdminPortal() {
  return (
    <div className="min-h-screen pt-32 pb-24 px-6 relative">
      <div className="container mx-auto max-w-5xl">
        <div className="flex items-center gap-3 mb-10">
          <FolderLock className="w-8 h-8 text-accent" />
          <h1 className="text-4xl font-bold tracking-tight">Studio Command Center</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Module 2: The "Zero-Click" Admin Upload Portal */}
          <div className="glass-panel rounded-3xl p-8 border border-white/10 flex flex-col items-center justify-center text-center">
            <h2 className="text-xl font-bold mb-2 w-full text-left flex items-center gap-2">
              <UploadCloud className="w-5 h-5 text-accent" /> 
              Direct-to-Drive Upload
            </h2>
            <p className="text-sm text-neutral-400 mb-8 w-full text-left">Files stream directly to Drive Folder: 1ZMO2upGMLds2wN8iYBZg6I9sPy3l16GK.</p>
            
            <form action={async (formData) => {
              "use server";
              const file = formData.get('mediaFile') as File;
              if (file && file.size > 0) {
                const arrayBuffer = await file.arrayBuffer();
                const buffer = Buffer.from(arrayBuffer);
                try {
                  const driveId = await uploadToDrive(buffer, file.name, file.type);
                  console.log("Uploaded File ID:", driveId);
                } catch (e) {
                  console.error("Upload failed", e);
                }
              }
            }} className="w-full">
              <div className="w-full border-2 border-dashed border-white/20 hover:border-accent/50 rounded-2xl p-8 transition-colors cursor-pointer group bg-black/20 flex flex-col items-center relative">
                
                {/* Visual UI */}
                <UploadCloud className="w-12 h-12 text-neutral-500 group-hover:text-accent mx-auto mb-4 transition-colors" />
                <p className="text-lg font-medium text-neutral-300">Select media to upload</p>
                <div className="mt-4 flex justify-center gap-4 mb-4">
                  <span className="px-3 py-1 bg-white/5 rounded-md text-xs font-medium text-neutral-400">MP4</span>
                  <span className="px-3 py-1 bg-white/5 rounded-md text-xs font-medium text-neutral-400">MOV</span>
                  <span className="px-3 py-1 bg-white/5 rounded-md text-xs font-medium text-neutral-400">JPG</span>
                </div>
                
                {/* The hidden actual file input */}
                <input 
                  type="file" 
                  name="mediaFile"
                  required
                  className="w-full mb-4 text-sm text-neutral-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-white/10 file:text-white hover:file:bg-white/20 transition-colors"
                />

                <button type="submit" className="w-full py-3 mt-2 rounded-xl bg-accent text-white font-semibold flex items-center justify-center gap-2 hover:bg-blue-600 transition-colors">
                  Upload to Drive <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>

            <div className="relative w-full my-6 flex items-center justify-center">
              <div className="border-t border-white/10 w-full"></div>
              <span className="absolute bg-[var(--background)] px-4 text-xs font-semibold text-neutral-500 uppercase tracking-widest">OR</span>
            </div>

            <form action={async (formData) => {
              "use server";
              const url = formData.get('youtubeUrl') as string;
              if (url) {
                try {
                  await addYouTubeLinkToDrive(url);
                  console.log("YouTube mapped");
                } catch (e) {
                  console.error(e);
                }
              }
            }} className="w-full">
              <div className="flex gap-2">
                <input 
                  type="url" 
                  name="youtubeUrl" 
                  placeholder="Paste YouTube Link..." 
                  required 
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-accent transition-colors" 
                />
                <button type="submit" className="px-6 py-3 rounded-xl bg-red-600 text-white font-bold hover:bg-red-700 transition-colors">
                  Add
                </button>
              </div>
            </form>
          </div>

          {/* Module 4: Metadata & SEO Manager (The "Brain") */}
          <div className="glass-panel rounded-3xl p-8 border border-white/10">
            <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
              <Database className="w-5 h-5 text-accent" /> 
              Metadata & SEO Manager
            </h2>
            <p className="text-sm text-neutral-400 mb-8">Attach Supabase metadata to a Drive File ID to index it on the live responsive gallery.</p>

            <form className="space-y-6" action={async (formData) => {
              "use server";
              // Simulated action for the template
              const data = {
                drive_file_id: formData.get('fileId') as string,
                caption: formData.get('caption') as string,
                category: formData.get('category') as string,
                project_date: formData.get('date') as string,
              };
              await saveMediaMetadata(data);
              console.log("Saved metadata:", data);
            }}>
              
              <div className="space-y-2">
                <label className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">Target Drive File ID</label>
                <div className="relative">
                  <FileVideo className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                  <input type="text" name="fileId" placeholder="e.g. 1A2b3C4d5E6f..." required className="w-full bg-black/40 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:border-accent transition-colors" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">Display Title (Caption)</label>
                <input type="text" name="caption" placeholder="e.g. Nike Air Max Launch Event" required className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-accent transition-colors" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">Category</label>
                  <select name="category" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-accent transition-colors appearance-none">
                    <option value="Corporate">Corporate</option>
                    <option value="Event">Event</option>
                    <option value="Wedding">Wedding</option>
                    <option value="Commercial">Commercial</option>
                    <option value="BTS">Behind the Scenes</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">Project Date</label>
                  <input type="date" name="date" required className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-accent transition-colors" />
                </div>
              </div>

              <button type="submit" className="w-full mt-4 flex items-center justify-center gap-2 py-3 rounded-xl bg-white text-black font-semibold hover:bg-neutral-200 transition-colors">
                <Save className="w-4 h-4" /> Save to Supabase DB
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}
