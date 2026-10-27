import React from 'react';
import { Instagram, ArrowRight, Heart, MessageCircle } from 'lucide-react';
import { Language } from '../types';
import { COMPANY_DETAILS } from '../data/content';

interface InstagramPreviewProps {
  language: Language;
}

export const InstagramPreview: React.FC<InstagramPreviewProps> = ({ language }) => {
  const posts = [
    {
      id: 1,
      image: 'https://res.cloudinary.com/fxqqfzhm/image/upload/v1789498061/IMG-20260522-WA0000_1_1.jpg',
      likes: '428',
      comments: '34',
      caption: 'Silkfert 40 KG Bio-Mineral Soil Conditioner for Grape October Pruning.',
    },
    {
      id: 2,
      image: 'https://res.cloudinary.com/fxqqfzhm/image/upload/v1789498078/IMG-20260522-WA0002_2.jpg',
      likes: '512',
      comments: '61',
      caption: 'Boromix-5F Multi-Micronutrient Grade preventing berry cracking in Nashik.',
    },
    {
      id: 3,
      image: 'https://res.cloudinary.com/fxqqfzhm/image/upload/v1789498149/IMG-20260821-WA0030_1.jpg',
      likes: '890',
      comments: '104',
      caption: 'Export grade grape harvest achieved using 100 KG Basal Kit.',
    },
    {
      id: 4,
      image: 'https://res.cloudinary.com/fxqqfzhm/image/upload/v1789498111/IMG-20260601-WA0007.jpg',
      likes: '640',
      comments: '48',
      caption: '100 KG Basal Kit packing at Micronik Pimpalgaon Depot.',
    },
  ];

  return (
    <section className="py-16 bg-[#F8F6F0] text-slate-900 border-t border-emerald-900/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Title */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-pink-100 text-pink-700 text-xs font-black">
              <Instagram className="w-3.5 h-3.5" />
              <span>@micronikagripvtltd</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-[#1B5E20]">
              {language === 'mr' ? 'इन्स्टाग्रामवर आमचे शेतकरी समुदाय' : 'Follow Micronik Agri on Instagram'}
            </h3>
          </div>

          <a
            href={COMPANY_DETAILS.instagramUrl}
            target="_blank"
            rel="noreferrer"
            className="px-5 py-2.5 rounded-2xl bg-[#1B5E20] text-white font-extrabold text-xs flex items-center gap-2 hover:bg-[#144718] transition-all border border-emerald-800"
          >
            <span>{language === 'mr' ? 'फॉलो करा (Follow Us)' : 'Follow @micronikagripvtltd'}</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {posts.map((post) => (
            <a
              key={post.id}
              href={COMPANY_DETAILS.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="group relative aspect-square rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 block"
            >
              <img
                src={post.image}
                alt={post.caption}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />

              <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-4 text-white text-xs">
                <div className="flex items-center gap-3 font-black">
                  <span className="flex items-center gap-1"><Heart className="w-4 h-4 text-red-500 fill-current" /> {post.likes}</span>
                  <span className="flex items-center gap-1"><MessageCircle className="w-4 h-4 text-amber-300" /> {post.comments}</span>
                </div>
                <p className="line-clamp-2 font-medium text-[11px]">{post.caption}</p>
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
};
