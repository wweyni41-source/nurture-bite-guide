import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ContentService, Song } from '../services/contentService';
import { Music as MusicIcon, Play, Loader2, Download, Volume2, Search } from 'lucide-react';

export const MusicPage = () => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchSongs();
  }, []);

  const fetchSongs = async () => {
    try {
      setLoading(true);
      const data = await ContentService.getSongs();
      setSongs(data);
    } catch (error) {
      console.error('Failed to fetch songs:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredSongs = songs.filter(s => 
    s.title.toLowerCase().includes(search.toLowerCase()) || 
    s.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-16">
        <div className="max-w-2xl">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Soothing Melodies</h2>
          <p className="text-gray-500 text-lg">Educational songs and gentle lullabies curated for early development.</p>
        </div>
        <div className="relative w-full md:w-80">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <Input 
            placeholder="Search songs..." 
            className="pl-12 h-12 rounded-2xl border-gray-100 bg-white shadow-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-32 space-y-4">
          <Loader2 className="w-10 h-10 text-pink-600 animate-spin" />
          <p className="text-gray-500 font-medium">Tuning in to the database...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredSongs.map((song) => (
              <motion.div 
                key={song.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ y: -5 }}
              >
                <Card className="overflow-hidden border-none shadow-sm hover:shadow-xl transition-all group bg-white">
                  <div className="relative h-64">
                    <img 
                      src={song.image_url} 
                      alt={song.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" 
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                      <div className="w-16 h-16 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center scale-90 group-hover:scale-100 transition-transform cursor-pointer">
                        <Play className="text-pink-600 fill-pink-600 ml-1" size={28} />
                      </div>
                    </div>
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-pink-600 text-white border-none px-3 py-1 shadow-lg font-bold">
                        {song.category}
                      </Badge>
                    </div>
                  </div>
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <CardTitle className="text-xl font-bold">{song.title}</CardTitle>
                      <Volume2 className="text-pink-200" size={20} />
                    </div>
                    <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">{song.description}</p>
                  </CardHeader>
                  <CardFooter className="border-t border-gray-50 bg-gray-50/30 flex gap-3">
                    <Button className="flex-1 bg-pink-600 hover:bg-pink-700 rounded-xl font-bold gap-2 shadow-lg shadow-pink-100">
                      <Play size={16} fill="currentColor" /> Listen
                    </Button>
                    <Button variant="outline" size="icon" className="w-12 h-12 rounded-xl border-gray-100 bg-white text-gray-400 hover:text-pink-600">
                      <Download size={18} />
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};