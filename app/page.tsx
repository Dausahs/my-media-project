import { getGalleryItems, parseFilename } from "@/lib/drive";
import { getMediaMetadata } from "@/lib/supabase";
import { ArrowRight, Play, Film, Calendar, MapPin, Users } from "lucide-react";

export default async function Home() {
  const gallery = await getGalleryItems();
  const metadata = await getMediaMetadata();

  // Merge Drive data with Supabase Metadata
  const enrichedPortfolio = gallery.map(item => {
    const meta = metadata.find(m => m.drive_file_id === item.id);
    return {
      ...item,
      title: meta?.caption || parseFilename(item.name),
      category: meta?.category || "Uncategorized",
      date: meta?.project_date || "Unknown Date"
    };
  });

  return (
    <div className="flex flex-col min-h-screen">
      {/* MODULE 1: Cinematic Showcase Hero */}
      <section id="showreel" className="relative h-screen w-full overflow-hidden flex items-center justify-center">
        {/* Background Video */}
        <div className="absolute inset-0 z-0">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline
            className="object-cover w-full h-full opacity-60"
            poster="https://images.unsplash.com/photo-1601506521937-0131109aabff?auto=format&fit=crop&q=80"
          >
            <source src="https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" type="video/mp4" />
          </video>
          {/* Gradient Overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent"></div>
          <div className="absolute inset-0 bg-black/30"></div>
        </div>

        {/* Content */}
        <div className="container relative z-10 px-6 mx-auto text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/10 mb-8 z-10 animate-fade-in-up">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
            <span className="text-xs font-medium uppercase tracking-widest text-neutral-300">High-End Production</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white to-neutral-600 mb-6 drop-shadow-lg">
            WE CRAFT <br /> VISUAL MASTERPIECES
          </h1>
          <p className="text-lg md:text-2xl text-neutral-400 font-light max-w-2xl mx-auto mb-12">
            Elevating your brand through cinematic storytelling. Seamless delivery from lens to screen.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="#portfolio" className="px-8 py-4 rounded-full bg-white text-black font-semibold hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2 group">
              View Our Work <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="#showreel-play" className="px-8 py-4 rounded-full glass text-white font-semibold hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
              <Play className="w-4 h-4 fill-white" /> Play Showreel
            </a>
          </div>
        </div>
      </section>

      {/* MODULE 3: Auto-Sync Media Gallery */}
      <section id="portfolio" className="py-24 bg-background z-10 relative border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-end mb-16">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Latest Projects</h2>
              <p className="text-neutral-500 font-light">Auto-synced from our studio drive.</p>
            </div>
            <div className="hidden md:flex gap-2">
              {['All', 'Corporate', 'Event', 'Wedding', 'BTS'].map(cat => (
                <button key={cat} className="px-4 py-1.5 rounded-full text-sm font-medium border border-white/10 hover:bg-white/5 transition-colors">
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {enrichedPortfolio.map((item, idx) => (
              <div key={item.id} className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-2xl aspect-[16/9] mb-4 bg-neutral-900 border border-white/5">
                  <img 
                    src={item.thumbnail || "https://images.unsplash.com/photo-1601506521937-0131109aabff?auto=format&fit=crop&q=80"} 
                    alt={item.title}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700 ease-out opacity-80 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500"></div>
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 glass px-3 py-1 rounded-full text-xs font-medium text-white/90">
                    {item.category}
                  </div>
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-16 h-16 rounded-full glass-panel flex items-center justify-center">
                      <Play className="w-6 h-6 fill-white text-white ml-1" />
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white group-hover:text-accent transition-colors">{item.title}</h3>
                  <div className="flex items-center gap-4 text-xs text-neutral-500 mt-2 font-medium">
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {item.date}</span>
                    <span className="flex items-center gap-1"><Film className="w-3 h-3" /> {item.name.replace(/\.[^/.]+$/, "")}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MODULE 5: Intelligent Inquiry Engine */}
      <section id="booking" className="py-24 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/20 rounded-full blur-[120px] pointer-events-none"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto glass-panel rounded-3xl p-8 md:p-12 border border-white/10 shadow-2xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">Book The Crew</h2>
              <p className="text-neutral-400">Tell us about your next project, and our intelligent engine will verify availability and quote range instantly.</p>
            </div>

            <form className="space-y-8" action={async (formData) => {
              "use server";
              console.log("Booking Inquiry Received:", Object.fromEntries(formData));
            }}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-neutral-300 flex items-center gap-2"><Calendar className="w-4 h-4 text-accent" /> Event Date</label>
                  <input type="date" name="date" required className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-neutral-300 flex items-center gap-2"><MapPin className="w-4 h-4 text-accent" /> Location / Venue</label>
                  <input type="text" name="location" placeholder="e.g. KLCC Convention Centre" required className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors placeholder:text-neutral-700" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-neutral-300 flex items-center gap-2"><Users className="w-4 h-4 text-accent" /> Crew Requirements</label>
                  <select name="crew" className="w-full bg-neutral-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors appearance-none">
                    <option value="solo">Solo Shooter (1 Pax)</option>
                    <option value="standard">Standard Crew (2-3 Pax)</option>
                    <option value="full">Full Production (4+ Pax)</option>
                    <option value="drone">Drone Team Only</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-neutral-300 flex items-center gap-2"><Film className="w-4 h-4 text-accent" /> Service Category</label>
                  <select name="service" className="w-full bg-neutral-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors appearance-none">
                    <option value="corporate">Corporate Event</option>
                    <option value="wedding">Wedding / Same-Day-Edit</option>
                    <option value="commercial">Commercial / Ad</option>
                    <option value="live">Live Streaming</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-300">Project Details & Budget</label>
                <textarea name="details" rows={4} placeholder="Tell us more about your vision and rough budget estimation..." className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors placeholder:text-neutral-700 resize-none"></textarea>
              </div>

              <button type="submit" className="w-full py-4 rounded-xl bg-gradient-to-r from-accent to-blue-500 text-white font-bold text-lg hover:shadow-[0_0_30px_rgba(37,99,235,0.4)] transition-shadow">
                Check Availability & Get Quote
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
