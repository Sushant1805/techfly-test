'use client';
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { setupAuthOptions } from '@/lib/api';

export default function FeeTemplatesPage() {
  const [templates, setTemplates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const userStr = localStorage.getItem('user');
        if (!userStr) return;
        const user = JSON.parse(userStr);
        const instituteSlug = user.instituteId;

        const res = await fetch(`/api/${instituteSlug}/fee-templates`);
        const data = await res.json();
        if (data.success) setTemplates(data.templates);
      } catch (error) {
        console.error('Error fetching fee templates:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTemplates();
  }, []);

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-text-slate tracking-tight">Fee Templates</h1>
          <p className="text-sm font-bold text-gray-400 mt-2 uppercase tracking-widest">Manage your fee structures</p>
        </div>
        <Button className="bg-brand-blue text-white rounded-2xl px-6 py-6 font-black text-xs uppercase tracking-widest shadow-glow hover:scale-105 transition-transform flex items-center gap-2">
          <Plus size={16} /> Add Template
        </Button>
      </div>

      {loading ? (
        <div className="text-center text-gray-500 py-10 font-bold uppercase tracking-widest">Loading templates...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.length === 0 && (
            <div className="col-span-3 text-center text-gray-400 py-10 font-bold uppercase tracking-widest">No fee templates found.</div>
          )}
          {templates.map(template => (
            <Card key={template._id} className="border-none shadow-soft hover:shadow-soft-lg transition-all rounded-[32px]">
              <CardContent className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <Badge className={`border-none font-black text-[10px] uppercase px-3 py-1.5 rounded-full ${
                    template.frequency === 'monthly' ? 'bg-brand-blue/10 text-brand-blue' : 'bg-purple-100 text-purple-600'
                  }`}>
                    {template.frequency}
                  </Badge>
                  <div className="flex gap-2">
                    <button className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:text-brand-blue hover:bg-brand-blue/10 transition-colors">
                      <Edit size={14} />
                    </button>
                    <button className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center text-red-400 hover:text-red-600 hover:bg-red-100 transition-colors">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
                <h3 className="text-xl font-black text-text-slate mb-1">{template.name}</h3>
                <p className="text-xs font-bold text-gray-400 mb-6 min-h-[32px]">{template.description}</p>
                
                <div className="pt-6 border-t border-gray-50 flex items-end justify-between">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Amount</p>
                    <span className="text-2xl font-black text-brand-blue">₹{template.amount.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
