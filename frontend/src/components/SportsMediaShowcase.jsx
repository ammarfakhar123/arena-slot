import React from 'react';
import { Play } from 'lucide-react';

export const SportsMediaShowcase = () => {
  const showcases = [
    {
      title: 'Indoor Cricket Nets & Speed Radar Lanes',
      sport: 'Cricket Nets',
      desc: 'Automatic bowling machines with real-time speed tracking and video playback.',
      videoPoster: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&q=80&w=800',
      badge: 'Speed Bowling',
    },
    {
      title: '7v7 & Futsal FIFA Synthetic Turfs',
      sport: 'Futsal & Football',
      desc: 'High-intensity night matches under FIFA-certified floodlights.',
      videoPoster: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=800',
      badge: 'Night Leagues',
    },
    {
      title: 'Panoramic Glass Court Padel Arenas',
      sport: 'Padel Clubs',
      desc: 'Pro-grade glass padel courts with climate control and espresso lounges.',
      videoPoster: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&q=80&w=800',
      badge: 'Glass Courts',
    },
  ];

  return (
    <div className="bg-slate-50 border-y border-slate-200 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-extrabold text-[#76C000] uppercase tracking-wider">
            Experience ArenaSlot Grounds
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#0B1B3D]">
            Pro-Level Sports Facilities Near You
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            From cricket bowling machine lanes to glass padel courts and futsal floodlights.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {showcases.map((s, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-md border border-slate-200 flex flex-col group relative"
            >
              <div className="relative h-52 w-full overflow-hidden">
                <img
                  src={s.videoPoster}
                  alt={s.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                <div className="absolute top-3 left-3 bg-[#76C000] text-[#0B1B3D] text-[10px] font-black px-2.5 py-1 rounded-md shadow-sm">
                  {s.badge}
                </div>

                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-white/30 backdrop-blur-md border border-white/60 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Play className="w-5 h-5 text-white fill-white ml-0.5" />
                  </div>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-2">
                <div>
                  <div className="text-xs font-bold text-[#0B1B3D]">{s.sport}</div>
                  <h3 className="text-base font-black text-[#0B1B3D] mt-1 group-hover:text-[#76C000] transition-colors">
                    {s.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                    {s.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
