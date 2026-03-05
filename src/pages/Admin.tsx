import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { ContentService } from '../services/contentService';
import { 
  LayoutDashboard, 
  BookOpen, 
  Music, 
  Utensils, 
  Plus, 
  Save, 
  Trash2, 
  Upload, 
  FileText,
  CheckCircle2,
  Loader2
} from 'lucide-react';

export const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState<'stories' | 'music' | 'food'>('stories');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form States
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content: '',
    category: 'General',
    image_url: '',
    age_group: '6-8m'
  });

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      content: '',
      category: 'General',
      image_url: '',
      age_group: '6-8m'
    });
  };

  const handleSubmit = async () => {
    if (!formData.title || !formData.description) {
      toast.error('Please fill in required fields');
      return;
    }

    setIsSubmitting(true);
    try {
      if (activeTab === 'stories') {
        await ContentService.addStory({
          title: formData.title,
          description: formData.description,
          content: formData.content,
          category: formData.category,
          image_url: formData.image_url || 'https://images.unsplash.com/photo-1544923246-77307dd654ca?auto=format&fit=crop&q=80&w=400',
        });
      } else if (activeTab === 'music') {
        await ContentService.addSong({
          title: formData.title,
          description: formData.description,
          audio_url: '#',
          category: formData.category,
          image_url: formData.image_url || 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=400',
        });
      } else if (activeTab === 'food') {
        await ContentService.updateFoodProgram({
          id: Math.random().toString(),
          age_group: formData.age_group,
          title: formData.title,
          framework: formData.description,
          image_url: formData.image_url || 'https://images.unsplash.com/photo-1440428099904-c6d459a7e7b5?auto=format&fit=crop&q=80&w=400'
        });
      }

      toast.success(`${activeTab.slice(0, -1)} published successfully!`);
      resetForm();
    } catch (error) {
      toast.error('Failed to save content. Check database connection.');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-12">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-200">
            <LayoutDashboard size={24} />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-gray-900 tracking-tight">Admin Panel</h1>
            <p className="text-gray-500 mt-1">Manage the Little Habesha platform content in real-time.</p>
          </div>
        </div>
        <div className="flex gap-2 bg-gray-100 p-1.5 rounded-2xl w-full lg:w-fit">
          {[ 
            { id: 'stories', icon: BookOpen, label: 'Stories' },
            { id: 'music', icon: Music, label: 'Music' },
            { id: 'food', icon: Utensils, label: 'Food' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 lg:flex-none flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all ${
                activeTab === tab.id ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <tab.icon size={16} />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-8">
          <Card className="border-none shadow-xl shadow-gray-100 overflow-hidden bg-white">
            <div className="h-2 bg-gradient-to-r from-blue-600 to-indigo-600 w-full" />
            <CardHeader className="flex flex-row items-center justify-between border-b border-gray-50 pb-6 pt-8">
              <div>
                <CardTitle className="text-2xl font-bold flex items-center gap-2">
                  <Plus className="text-blue-600" size={24} />
                  Add New {activeTab.charAt(0).toUpperCase() + activeTab.slice(1, -1)}
                </CardTitle>
                <p className="text-gray-400 text-sm mt-1">Create content that will be instantly visible to users.</p>
              </div>
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-red-500 hover:bg-red-50" onClick={resetForm}>
                Reset Form
              </Button>
            </CardHeader>
            <CardContent className="space-y-8 pt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-sm font-bold text-gray-700 ml-1">Title</label>
                  <Input 
                    placeholder="Catchy headline..." 
                    className="rounded-xl h-14 bg-gray-50 border-transparent focus:bg-white focus:border-blue-500 transition-all"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-sm font-bold text-gray-700 ml-1">
                    {activeTab === 'food' ? 'Age Group' : 'Category'}
                  </label>
                  <select 
                    className="w-full h-14 px-4 rounded-xl border-transparent bg-gray-50 focus:bg-white focus:border-blue-500 transition-all appearance-none"
                    value={activeTab === 'food' ? formData.age_group : formData.category}
                    onChange={(e) => setFormData({
                      ...formData, 
                      [activeTab === 'food' ? 'age_group' : 'category']: e.target.value
                    })}
                  >
                    {activeTab === 'food' ? (
                      <>
                        <option value="6-8m">6-8 Months</option>
                        <option value="9-12m">9-12 Months</option>
                        <option value="12-18m">12-18 Months</option>
                        <option value="18-24m+">18-24+ Months</option>
                      </>
                    ) : (
                      <>
                        <option value="General">General</option>
                        <option value="Bedtime">Bedtime</option>
                        <option value="Educational">Educational</option>
                        <option value="Cultural">Cultural</option>
                      </>
                    )}
                  </select>
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-bold text-gray-700 ml-1">Description / Framework Summary</label>
                <textarea 
                  className="w-full h-32 p-5 rounded-2xl border-transparent bg-gray-50 focus:bg-white focus:border-blue-500 transition-all focus:ring-0"
                  placeholder="Provide a brief overview for the preview card..."
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                />
              </div>

              {activeTab === 'stories' && (
                <div className="space-y-3">
                  <label className="text-sm font-bold text-gray-700 ml-1">Story Content</label>
                  <textarea 
                    className="w-full h-64 p-5 rounded-2xl border-transparent bg-gray-50 focus:bg-white focus:border-blue-500 transition-all"
                    placeholder="Write the full story here..."
                    value={formData.content}
                    onChange={(e) => setFormData({...formData, content: e.target.value})}
                  />
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-10 border-2 border-dashed border-gray-100 rounded-3xl text-center space-y-3 hover:border-blue-100 hover:bg-blue-50/30 cursor-pointer transition-all">
                  <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Upload size={28} />
                  </div>
                  <div>
                    <p className="text-base font-bold text-gray-800">Upload Hero Image</p>
                    <p className="text-xs text-gray-400">PNG, JPG or WEBP up to 5MB</p>
                  </div>
                </div>
                <div className="p-10 border-2 border-dashed border-gray-100 rounded-3xl text-center space-y-3 hover:border-purple-100 hover:bg-purple-50/30 cursor-pointer transition-all">
                  <div className="w-14 h-14 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-2">
                    <FileText size={28} />
                  </div>
                  <div>
                    <p className="text-base font-bold text-gray-800">Attach Resource (PDF)</p>
                    <p className="text-xs text-gray-400">Guides, menus or checklists</p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="justify-end bg-gray-50/50 border-t border-gray-50 p-8">
              <Button 
                disabled={isSubmitting}
                className="h-14 px-10 rounded-2xl bg-blue-600 hover:bg-blue-700 font-bold gap-3 text-lg shadow-lg shadow-blue-100 transition-all active:scale-95"
                onClick={handleSubmit}
              >
                {isSubmitting ? (
                  <><Loader2 size={20} className="animate-spin" /> Publishing...</>
                ) : (
                  <><Save size={20} /> Publish to Platform
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="space-y-8">
          <Card className="border-none shadow-xl shadow-gray-100 overflow-hidden bg-white">
            <CardHeader className="bg-gray-50/80 border-b border-gray-100 p-6 flex flex-row items-center justify-between">
              <span className="font-bold uppercase tracking-widest text-[10px] text-gray-400">Live Status</span>
              <Badge className="bg-green-500 text-white border-none px-2 py-0.5">Operational</Badge>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-2xl border border-blue-100">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-blue-600 shadow-sm">
                  <CheckCircle2 size={20} />
                </div>
                <div>
                  <p className="font-bold text-sm text-blue-900">Real-time Sync</p>
                  <p className="text-[10px] text-blue-600">Connected to Supabase DB</p>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-bold text-sm text-gray-700 ml-1">Recent Platform Updates</h4>
                <div className="space-y-3">
                  {[ 
                    { label: 'Traditional Lullaby', type: 'Music', time: '12m ago' },
                    { label: 'Lion & Cub Story', type: 'Story', time: '2h ago' },
                    { label: '6-8m Feeding PDF', type: 'Resource', time: 'Yesterday' }
                  ].map((item, i) => (
                    <div key={i} className="p-4 rounded-2xl border border-gray-50 flex items-center justify-between hover:bg-gray-50 transition-colors group">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-blue-400 group-hover:scale-125 transition-transform" />
                        <div>
                          <p className="font-bold text-xs">{item.label}</p>
                          <p className="text-[10px] text-gray-400">{item.type} \u2022 {item.time}</p>
                        </div>
                      </div>
                      <Trash2 size={14} className="text-gray-300 hover:text-red-500 cursor-pointer" />
                    </div>
                  ))}
                </div>
              </div>

              <Button variant="outline" className="w-full h-12 rounded-xl border-gray-100 text-gray-600 font-bold">
                View Full Analytics
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};