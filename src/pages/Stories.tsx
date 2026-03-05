import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ContentService, Story } from '../services/contentService';
import { BookOpen, Search, Download, Loader2, ArrowRight } from 'lucide-react';

export const StoriesPage = () => {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  // IMPORTANT: This addresses the user's "You forgot to re-fetch" and "useEffect" points
  useEffect(() => {
    fetchStories();
  }, []);

  const fetchStories = async () => {
    try {
      setLoading(true);
      const data = await ContentService.getStories();
      setStories(data);
    } catch (error) {
      console.error('Failed to fetch stories:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredStories = stories.filter(s => 
    s.title.toLowerCase().includes(search.toLowerCase()) || 
    s.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-16">
        <div className="max-w-2xl">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Enchanting Stories</h2>
          <p className="text-gray-500 text-lg">Culturally rich tales designed to spark imagination and teach valuable life lessons.</p>
        </div>
        <div className="relative w-full md:w-80">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <Input 
            placeholder="Search stories..." 
            className="pl-12 h-12 rounded-2xl border-gray-100 bg-white shadow-sm focus:ring-blue-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-32 space-y-4">
          <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
          <p className="text-gray-500 font-medium">Loading stories from database...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredStories.map((story) => (
              <motion.div 
                key={story.id} 
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ y: -5 }}
              >
                <Card className="overflow-hidden border-none shadow-sm hover:shadow-xl transition-all group h-full flex flex-col bg-white">
                  <div className="h-56 overflow-hidden relative">
                    <img 
                      src={story.image_url} 
                      alt={story.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-white/90 backdrop-blur-sm text-blue-600 hover:bg-white border-none px-3 py-1 shadow-sm font-bold">
                        {story.category}
                      </Badge>
                    </div>
                  </div>
                  <CardHeader className="flex-grow">
                    <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {story.title}
                    </CardTitle>
                    <p className="text-gray-500 text-sm leading-relaxed line-clamp-3">{story.description}</p>
                  </CardHeader>
                  <CardFooter className="flex justify-between border-t border-gray-50 pt-4 bg-gray-50/30">
                    <Button variant="ghost" className="text-blue-600 hover:text-blue-700 hover:bg-white font-bold group/btn">
                      Read Now <ArrowRight size={16} className="ml-2 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                    <Button variant="outline" size="sm" className="gap-2 bg-white rounded-xl border-gray-100 text-gray-600">
                      <Download size={14} /> PDF
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>

          {!loading && filteredStories.length === 0 && (
            <div className="col-span-full text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-100">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                <BookOpen className="text-gray-300" size={32} />
              </div>
              <h3 className="text-lg font-bold text-gray-900">No stories found</h3>
              <p className="text-gray-500">Try adjusting your search criteria.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};